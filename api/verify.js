export default async function handler(req, res) {
  // Your confirmed Google URL
  const GOOGLE_URL = 'https://us-central1-craic-bot.cloudfunctions.net/pint_verifier';

  try {
    const response = await fetch(GOOGLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ status: "error", message: "Internal Proxy Error" });
  }
}
