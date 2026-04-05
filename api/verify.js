
export const config = {
  maxDuration: 60,
};

// Simple in-memory rate limiter
// Stores request counts per IP
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;        // max requests
const RATE_LIMIT_WINDOW = 60000; // per 60 seconds

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    // First request from this IP
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }

  if (now - record.start > RATE_LIMIT_WINDOW) {
    // Window expired — reset
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    // Too many requests in window
    return true;
  }

  // Increment count
  record.count++;
  return false;
}

// Clean up old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.start > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000);

export default async function handler(req, res) {
  const GOOGLE_URL = 'https://us-central1-craic-bot.cloudfunctions.net/pint_verifier';

  // Get IP address
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
    || req.headers['x-real-ip'] 
    || req.socket?.remoteAddress 
    || 'unknown';

  // Check rate limit
  if (isRateLimited(ip)) {
    return res.status(429).json({ 
      status: "error", 
      message: "Steady on! Too many requests. Try again in a minute. 🍺" 
    });
  }

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
    console.error("Vercel Proxy Error:", error.message);
    return res.status(504).json({ 
      status: "error", 
      message: "The tap is running slow! Try again. 🍺" 
    });
  }
}
