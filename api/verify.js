export const config = {
  maxDuration: 60, 
};

export default async function handler(req, res) {
  // FIXED: Added the specific function suffix
  const GOOGLE_URL = 'https://us-central1-craic-bot.cloudfunctions.net';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); 

    const response = await fetch(GOOGLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    return res.status(504).json({ status: "error", message: "The tap is slow! Try again. 🍺" });
  }
}


