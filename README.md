# ☘️ Proof of Pint

> Proof of Work. Proof of Stake. And now — Proof of Pint.

The only consensus mechanism that ends with a cold one.

**Proof of Pint** is a Farcaster Mini App on Base blockchain that rewards users with $CRAIC tokens for verifying they are physically present in an Irish pub anywhere in the world.

---

## How it works

1. Find an Irish pub anywhere in the world
2. Open Proof of Pint on Farcaster
3. Snap a photo of your pint
4. Google Vision AI verifies it's a real pint
5. Google Maps confirms you're in a pub
6. Earn **5,000 $CRAIC** on Base — one reward per day

---

## Live

- **Mini App** → [proof-of-pint.vercel.app](https://proof-of-pint.vercel.app)
- **Live Globe Dashboard** → [craic-globe.vercel.app](https://craic-globe.vercel.app)

---

## $CRAIC Token

- **Contract:** `0x13e9272c4f6b574d08df3d70D07cd365Cf424b07`
- **Chain:** Base
- **Supply:** 100,000,000,000 (100B)
- **Deployed via:** Clanker
- **Liquidity:** Uniswap V3 on Base

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Farcaster Mini Apps SDK, Vercel |
| Backend | Python Google Cloud Function |
| Image verification | Google Cloud Vision AI |
| Location verification | Google Maps Places API |
| Database | Firebase Firestore |
| Blockchain | Base (Ethereum L2) |
| Token standard | ERC-20 |
| Globe dashboard | Mapbox GL JS |

---

## Tokenomics

### Phase 1 — Live
- Fixed **5,000 $CRAIC** per verified pint
- One reward per wallet per 24 hours
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
├── index.html          # Farcaster Mini App frontend
├── verify.js           # Vercel proxy API route
├── main.py             # Python Google Cloud Function (backend)
├── vercel.json         # Vercel config
└── public/
    └── .well-known/
        └── farcaster.json   # Farcaster Mini App manifest
```

---

## Features

- 🍺 **AI pint verification** — Google Vision AI checks it's a real beer
- 📍 **Location verification** — Google Maps confirms you're in a pub
- 🌍 **Live globe dashboard** — every verified pint drops a pin on the map
- ☘️ **Irish pub discovery** — find the nearest Irish pub anywhere in the world
- 🏆 **Leaderboards** — countries, Irish counties, pubs, players
- ⛓️ **On-chain rewards** — $CRAIC sent directly to your Base wallet

---

## Built by

[@craic](https://warpcast.com/craic) — Ireland ☘️

---

## Links

- [Farcaster](https://warpcast.com)
- [Base](https://base.org)
- [Clanker](https://clanker.world)
- [Uniswap](https://app.uniswap.org)
