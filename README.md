# PromptForge — Deployable App

This is a standalone, deployable version of PromptForge. It's already been test-built
and confirmed working outside of Claude (see the launch guide for how to actually put
it online).

## Before you deploy — 2 things to change

Open `src/App.jsx` and update these two constants near the top:

1. `CODE_SECRET` — currently a placeholder. Set this to your own private string.
2. `UNLOCK_PRICE_NAIRA` and `PURCHASE_URL` — set your real price and Selar link.

Use the exact same `CODE_SECRET` in your Code Generator tool so the codes it produces
stay valid in this app.

## Local preview (optional)

```
npm install
npm run dev
```

## Build for production

```
npm install
npm run build
```

This creates a `dist/` folder — that's the entire live website, ready to upload
to any static host.

See the full launch guide for step-by-step Vercel/Netlify deployment and the
Selar listing walkthrough.
