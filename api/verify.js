export default async function handler(req, res) {
  // Replace the URL below with your actual Google Cloud Function URL
  const GOOGLE_URL = 'https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/pint_verifier';

  try {
    const response = await fetch(GOOGLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Proxy Error: " + error.message });
  }
}
