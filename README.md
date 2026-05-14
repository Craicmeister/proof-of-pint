# Proof of Pint

Proof of Work. Proof of Stake. And now — Proof of Pint.

The only consensus mechanism that ends with a cold one.

Proof of Pint is a Web3 app on Base blockchain that rewards users with $CRAIC tokens for verifying they are physically present in an Irish pub anywhere in the world.

---

## How it works

1. Find an Irish pub anywhere in the world
2. Open Proof of Pint in your browser
3. Snap a photo of your pint
4. Google Vision AI verifies it's a real pint
5. Google Maps confirms you're in a pub
6. Choose how to receive your 5,000 $CRAIC:
   - **Email** — get a claim link sent to you, paste your wallet address later to receive your tokens
   - **Coinbase Wallet** — connect directly and receive instantly on Base
7. Set your leaderboard name and share to X
8. One reward per day

---

## Live

- **App** → [proof-of-pint.vercel.app/app](https://proof-of-pint.vercel.app/app)
- **Live Globe Dashboard** → [craic-globe.vercel.app](https://craic-globe.vercel.app)
- **Website** → [proof-of-pint.com](https://proof-of-pint.com)

---

## $CRAIC Token

| | |
|---|---|
| **Contract** | `0x13e9272c4f6b574d08df3d70D07cd365Cf424b07` |
| **Chain** | Base |
| **Supply** | 100,000,000,000 (100B) |
| **Deployed via** | Clanker |
| **Liquidity** | Uniswap V3 on Base |

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | HTML/JS, Vercel |
| Backend | Python Google Cloud Function |
| Image verification | Google Cloud Vision AI |
| Location verification | Google Maps Places API |
| Email delivery | Resend |
| Database | Firebase Firestore |
| Photo storage | Google Cloud Storage |
| Blockchain | Base (Ethereum L2) |
| Token standard | ERC-20 |
| Globe dashboard | Three.js |
| Wallet connect | Coinbase Wallet SDK |

---

## Reward & Claim Flow

### In the pub
1. Snap photo → AI + location verification runs
2. Pub confirmed → reward screen appears
3. Choose: **Email it to me** or **Coinbase Wallet**

### Email path (works for everyone)
- Enter your email — claim link sent instantly via Resend
- Click the link anytime — paste your Base wallet address
- $CRAIC sent directly to that address, no wallet connection required in the pub

### Coinbase Wallet path
- Connect Coinbase Wallet directly in the browser
- $CRAIC sent immediately to your wallet on Base

### After claiming
- Set a display name for the leaderboard
- Share your verified pint to X
- One pint per 24 hours enforced by session + Firestore

---

## Tokenomics

### Phase 1 — Live
- Fixed 5,000 $CRAIC per verified pint
- One reward per user per 24 hours
- Funded from treasury hot wallet

### Phase 2 — Upcoming
- 0.1% of daily $CRAIC trading volume routed to hot wallet
- Self-sustaining reward loop

### Phase 3 — Roadmap
- Dynamic rewards based on average pint price by country
- Requires price oracle + DEX volume tracking

---

## Repo Structure

```
proof-of-pint/
├── public/
│   ├── app.html            # Main app (verify pint, claim $CRAIC)
│   ├── claim.html          # Claim page (wallet address input → send $CRAIC)
│   ├── index.html          # Globe dashboard (Three.js)
│   └── .well-known/
│       └── farcaster.json  # Farcaster Mini App manifest
├── api/
│   └── verify.js           # Vercel proxy + rate limiting
├── main.py                 # Python Google Cloud Function (backend)
└── vercel.json             # Vercel config
```

---

## Features

- 🍺 **AI pint verification** — Google Vision AI checks labels and colour to confirm a real beer
- 📍 **Location verification** — Google Maps confirms you're in a pub, not a supermarket
- 🌍 **Live globe dashboard** — every verified pint drops a pin on the 3D world map
- ☘️ **Irish pub discovery** — find the nearest Irish pub anywhere in the world
- 🏆 **Leaderboards** — countries, Irish counties, pubs, players
- 📧 **Email claim flow** — no wallet required in the pub, claim at home
- ⛓️ **On-chain rewards** — $CRAIC sent directly to your Base wallet
- 🔒 **Duplicate prevention** — perceptual hashing blocks recycled pint photos
- 💬 **County banter** — personalised response for all 32 Irish counties

---

## Anti-fraud

- Perceptual hash (pHash) — identical or near-identical photos rejected
- Google Vision AI — label detection + colour analysis confirms it's actually a pint
- 24-hour cooldown — one reward per session per day
- Location cross-check — GPS coordinates matched against Google Maps pub database

---

## Built by

[@craic](https://x.com/craic) — Ireland ☘️

---

## Links

- [Base](https://base.org)
- [Clanker](https://clanker.world)
- [Uniswap](https://app.uniswap.org)
- [Basescan — $CRAIC](https://basescan.org/token/0x13e9272c4f6b574d08df3d70D07cd365Cf424b07)
