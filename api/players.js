import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  try {
    const snapshot = await db.collection('players').get();

    // Return a flat map: { user_id: display_name }
    const players = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.display_name) {
        players[doc.id] = data.display_name;
      }
    });

    return res.status(200).json({ players });

  } catch (error) {
    console.error('Players fetch error:', error);
    return res.status(500).json({ error: error.message });
  }
}

