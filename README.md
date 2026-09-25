# Hotel Maintenance Console

A real, database-backed maintenance-tracking app for a 211-apartment property (141 Studio + 70 One-Bedroom, floors 3–15, numbered 301–1508):

- **Database**: Supabase (Postgres) — tables `rooms` and `orders`, Row Level Security enabled
- **Backend**: Vercel serverless functions in `/api` — the only thing allowed to talk to the database
- **Frontend**: Static HTML/CSS/JS at the repo root — talks only to `/api`, bilingual (English/Arabic)

Deploy this repo to Vercel as-is and everyone who opens the URL — front desk, maintenance staff, management — sees the same live data. The frontend polls the API every 8 seconds, so a change made on one device shows up on every other device within a few seconds.

## Project layout

```
├── index.html, app.js, styles.css, config.js   ← the frontend (served as static files)
├── api/                                         ← the backend (each file = one serverless function)
│   ├── _lib/
│   │   ├── supabaseClient.js
│   │   └── util.js
│   ├── health.js
│   ├── orders/
│   │   ├── index.js         GET (list) / POST (create)      → /api/orders
│   │   └── [id].js          GET / PATCH / DELETE             → /api/orders/:id
│   │       [id]/close.js    POST (quick action)              → /api/orders/:id/close
│   │       [id]/reopen.js   POST (quick action)              → /api/orders/:id/reopen
│   ├── rooms/
│   │   ├── index.js         GET (list)                       → /api/rooms
│   │   └── [number].js      PATCH (change type)               → /api/rooms/:number
│   └── report/
│       └── index.js         GET (daily report)                → /api/report
├── vercel.json
├── package.json
└── backend/          (optional) — a standalone Express version of the same API,
                        for people who'd rather deploy to Render/Railway instead of
                        Vercel. Not used by the Vercel deployment (see .vercelignore).
```

## 1. Database (already set up)

A Supabase project has already been created and migrated for you:

- Project URL: `https://bjbaheznhdkzyidhwbsc.supabase.co`
- Tables: `rooms` (211 rows, seeded) and `orders` (8 sample work orders, seeded)
- Row Level Security is **enabled with no policies** — the tables are locked down by default. Only a request using the **service role key** (used exclusively by the `/api` functions, never the frontend) can read or write.

Inspect or reset data anytime at https://supabase.com/dashboard/project/bjbaheznhdkzyidhwbsc.

## 2. Deploy to Vercel (recommended path)

1. Push this repo to GitHub (or import it directly if you're uploading via Vercel's "Add New Project" → import from GitHub).
2. In Vercel, create a new project from this repo. Leave the default settings — no build command needed, Vercel auto-detects the static frontend and the `/api` functions.
3. **Before your first real deploy**, go to your Vercel project → **Settings → Environment Variables** and add:
   - `SUPABASE_URL` = `https://bjbaheznhdkzyidhwbsc.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase **service_role** secret key (get it from https://supabase.com/dashboard/project/bjbaheznhdkzyidhwbsc/settings/api — copy the `service_role` key, **not** the `anon` key)

   Add both for all environments (Production, Preview, Development).
4. Redeploy (Vercel → Deployments → ⋯ → Redeploy) so the new environment variables take effect.
5. Open the deployment URL — the app should load, and the sync badge in the header should show "Live · shared".

If you see `FUNCTION_INVOCATION_FAILED`, it almost always means the two environment variables above aren't set yet (or a redeploy hasn't run since you added them).

### API reference

| Method | Path | Description |
|---|---|---|
| GET | `/api/orders` | List orders. Query params: `date`, `status`, `priority`, `room`, `search` |
| POST | `/api/orders` | Create an order |
| PATCH | `/api/orders/:id` | Update an order |
| POST | `/api/orders/:id/close` | Quick action: mark done + stamp today's date |
| POST | `/api/orders/:id/reopen` | Quick action: set back to pending |
| DELETE | `/api/orders/:id` | Delete an order |
| GET | `/api/rooms` | List all 211 apartments and their types |
| PATCH | `/api/rooms/:number` | Change an apartment's type (`Studio` or `1BR`) |
| GET | `/api/report?date=YYYY-MM-DD` | Daily report: totals + full order list for that date |
| GET | `/api/health` | Health check |

## 3. Alternative: Express + Render/Railway

If you'd rather not use Vercel, the `/backend` folder has the same API built as a traditional always-on Express server, meant for Render or Railway, paired with the frontend also copied into `/backend`'s sibling — see `backend/README` notes in code comments. This path needs a separate static host for the frontend (Netlify/Vercel/GitHub Pages) since Express doesn't serve it. Most people should just use the Vercel path above — it's simpler (one deploy, no separate frontend/backend hosting).

## 4. Local development

You need [Vercel CLI](https://vercel.com/docs/cli) to run the `/api` functions locally alongside the static frontend:

```bash
npm install -g vercel
vercel dev
```

Create a `.env` file at the repo root (gitignored) with:

```
SUPABASE_URL=https://bjbaheznhdkzyidhwbsc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`vercel dev` reads this automatically. Open the URL it prints — frontend and API both run together, exactly like production.

## Notes on the architecture

- The frontend never talks to Supabase directly — only to `/api`. This means the Supabase service role key (full database access) only ever lives in Vercel's environment variables, never shipped to a browser.
- Data refresh is polling-based (every 8 seconds), not real-time websockets — simpler to run and debug, and more than fast enough for a maintenance workflow.
- The `orders.room` column has a foreign key to `rooms.number`, so you can't log a work order against an apartment number that doesn't exist.

