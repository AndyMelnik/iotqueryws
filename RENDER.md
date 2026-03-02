# Deploy on Render.com

This app is configured to deploy as a **Static Site** on [Render](https://render.com) (recommended).

---

## Why Static Site (not Web Service)

| | Static Site | Web Service |
|---|-------------|-------------|
| **Runtime** | Pre-built HTML/CSS/JS from `next build` | Node server (`next start`) |
| **Cold starts** | None | Yes on free tier when idle |
| **Cost** | Free tier friendly | Free tier has spin-down |
| **This app** | ✅ No API routes, no server-only features; all logic is client-side | Not required |

The app uses Next.js **static export** (`output: 'export'` in `next.config.ts`). The build produces an `out` folder that Render serves as a static site.

---

## Deploy steps (Static Site)

1. Go to [dashboard.render.com](https://dashboard.render.com) and sign in.
2. **New** → **Static Site** (not Web Service).
3. Connect your Git provider and select the repo.
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `out`
   - **Root Directory:** leave empty, or set to the app folder if this code lives in a subdirectory (e.g. `mini-site`).
5. Click **Create Static Site**. After the build, the site will be live at a URL like `https://iot-query-website.onrender.com`.

No environment variables are required.

---

## If you ever need a Web Service

Use a Web Service only if you add API routes, server-side rendering, or other Node-only features. Then:

- Remove `output: "export"` from `next.config.ts`.
- **New** → **Web Service**, **Build:** `npm install && npm run build`, **Start:** `npm start`.

---

## Repo in a subdirectory

If the Next.js app is not at the repo root (e.g. repo has multiple projects, app is in `mini-site`):

- Set **Root Directory** to that folder (e.g. `mini-site`).
- Build command and Publish directory stay the same (`out`).
