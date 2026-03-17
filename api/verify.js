// 1. Tell Vercel to wait for 60 seconds (Crucial for Blockchain & AI)
export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  // 2. Your confirmed Google URL
  const GOOGLE_URL = 'https://us-central1-craic-bot.cloudfunctions.net';

  // 3. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ status: "error", message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(GOOGLE_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    // Return the Google result back to your phone
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ 
      status: "error", 
      message: "Vercel Proxy Error: " + error.message 
    });
  }
}
