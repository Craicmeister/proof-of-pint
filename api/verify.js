export const config = {
  maxDuration: 60, // Forces Vercel to wait a full minute
};

export default async function handler(req, res) {
  const GOOGLE_URL = 'https://us-central1-craic-bot.cloudfunctions.net';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55s safety timeout

    const response = await fetch(GOOGLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Vercel Proxy Error:", error.message);
    return res.status(504).json({ status: "error", message: "Verification timed out. Try again!" });
  }
}

