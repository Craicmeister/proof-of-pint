const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat and lng are required' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Maps API key not configured' });
  }

  try {
    // --- Step 1: Search Google Places for nearby Irish pubs ---
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=irish+pub&type=bar&key=${apiKey}`;
    const placesRes = await fetch(placesUrl);
    const placesData = await placesRes.json();

    const results = placesData.results || [];

    // --- Step 2: Pull verified pints from Firestore ---
    let verifiedPubs = {};
    try {
      const admin = await import('firebase-admin');

      if (!admin.default.apps.length) {
        admin.default.initializeApp({
          credential: admin.default.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        });
      }

      const db = admin.default.firestore();
      const pintsSnap = await db.collection('pint_hashes').get();

      pintsSnap.forEach(doc => {
        const data = doc.data();
        if (data.pub) {
          verifiedPubs[data.pub.toLowerCase().trim()] = (verifiedPubs[data.pub.toLowerCase().trim()] || 0) + 1;
        }
      });
    } catch (fbErr) {
      console.error('Firestore error (non-fatal):', fbErr);
    }

    // --- Step 3: Build response with distance + verified status ---
    const pubs = results.slice(0, 10).map(place => {
      const pubNameKey = place.name.toLowerCase().trim();
      const pintCount = verifiedPubs[pubNameKey] || 0;
      const verified = pintCount > 0;

      // Calculate distance in km
      const R = 6371;
      const dLat = ((place.geometry.location.lat - parseFloat(lat)) * Math.PI) / 180;
      const dLng = ((place.geometry.location.lng - parseFloat(lng)) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((parseFloat(lat) * Math.PI) / 180) *
          Math.cos((place.geometry.location.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceStr = distanceKm < 1
        ? `${Math.round(distanceKm * 1000)}m away`
        : `${distanceKm.toFixed(1)}km away`;

      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}&destination_place_id=${place.place_id}`;

      return {
        name: place.name,
        address: place.vicinity || '',
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        rating: place.rating || null,
        total_ratings: place.user_ratings_total || 0,
        open_now: place.opening_hours?.open_now ?? null,
        distance: distanceStr,
        distance_km: distanceKm,
        maps_url: mapsUrl,
        place_id: place.place_id,
        verified,
        pint_count: pintCount,
      };
    });

    // Sort: verified pubs first, then by distance
    pubs.sort((a, b) => {
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
      return a.distance_km - b.distance_km;
    });

    return res.status(200).json({ pubs });

  } catch (err) {
    console.error('find-pubs error:', err);
    return res.status(500).json({ error: 'Failed to find pubs', detail: err.message });
  }
}
