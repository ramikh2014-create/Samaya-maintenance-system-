# Hotel Maintenance Console

A real, three-tier maintenance-tracking app for a 211-apartment property (141 Studio + 70 One-Bedroom, floors 3–15, numbered 301–1508):

- **Database**: Supabase (Postgres) — tables `rooms` and `orders`, Row Level Security enabled
- **Backend**: Node.js + Express REST API (`/backend`) — the only thing allowed to talk to the database
- **Frontend**: Static HTML/CSS/JS app (`/frontend`) — talks only to the backend API, bilingual (English/Arabic)

Everyone who opens the frontend — front desk, maintenance staff, management — sees the same live data. The frontend polls the backend every 8 seconds, so a change made on one device shows up on every other device within a few seconds.

## Project layout

```
hotel-maintenance/
├── backend/          Express REST API
│   ├── routes/
│   │   ├── orders.js
│   │   ├── rooms.js
│   │   └── report.js
│   ├── server.js
│   ├── supabaseClient.js
│   ├── package.json
│   └── .env.example
└── frontend/          Static app (no build step)
    ├── index.html
    ├── app.js
    ├── styles.css
    └── config.js
```

## 1. Database (already set up)

A Supabase project has already been created and migrated for you:

- Project URL: `https://bjbaheznhdkzyidhwbsc.supabase.co`
- Tables: `rooms` (211 rows, seeded) and `orders` (8 sample work orders, seeded)
- Row Level Security is **enabled with no policies** — meaning the tables are locked down by default. Only a request using the **service role key** (used exclusively by the backend, never the frontend) can read or write. This is the secure pattern: even if someone found your Supabase URL, they couldn't touch the data without that key.

If you ever need to inspect or reset the data, use the Supabase dashboard's Table Editor or SQL Editor at https://supabase.com/dashboard/project/bjbaheznhdkzyidhwbsc.

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in your **service role key**:

1. Open https://supabase.com/dashboard/project/bjbaheznhdkzyidhwbsc/settings/api
2. Under "Project API keys", copy the **`service_role`** secret (not the `anon` key)
3. Paste it as `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env`

**Never commit `.env` or share the service role key** — it bypasses all database security. `.gitignore` already excludes it.

Run the backend:

```bash
npm start
```

It listens on `http://localhost:4000` by default. Check it's alive:

```bash
curl http://localhost:4000/api/health
```

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

## 3. Frontend setup

The frontend is plain static files — no build step, no framework, no npm install needed. It just needs to know where your backend lives.

Edit `frontend/config.js`:

```js
const API_BASE_URL = 'http://localhost:4000'; // or your deployed backend URL
```

Then open `frontend/index.html` directly in a browser, or serve the folder with any static file server:

```bash
cd frontend
npx serve .
```

## 4. Deploying so everyone can use it

You need to host two things: the backend (a long-running Node process) and the frontend (static files). Good free/cheap options:

**Backend** (pick one):
- [Render](https://render.com) — new Web Service, connect your GitHub repo, root directory `backend`, build command `npm install`, start command `npm start`, add the two env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) in the dashboard.
- [Railway](https://railway.app) — similar flow, auto-detects Node.

**Frontend** (pick one):
- [Netlify](https://netlify.com) or [Vercel](https://vercel.com) — deploy the `frontend` folder as a static site.
- GitHub Pages — enable Pages on this repo, serve the `frontend` folder.

After deploying the backend, copy its public URL into `frontend/config.js` as `API_BASE_URL`, then redeploy the frontend.

Once both are live, share the frontend's URL with your team — front desk, maintenance staff, and management can all open it from any device and see the same live data.

## 5. Local development quick start

Two terminals:

```bash
# Terminal 1
cd backend && npm install && cp .env.example .env  # then fill in .env
npm run dev

# Terminal 2
cd frontend && npx serve .
```

## Notes on the architecture

- The frontend never talks to Supabase directly — only to your backend. This means the Supabase service role key (which has full database access) only ever lives on the server, never shipped to a browser.
- Data refresh is polling-based (every 8 seconds), not real-time websockets. For a hotel maintenance workflow this is more than fast enough, and much simpler to run and debug than a websocket/Realtime setup. If you outgrow this later, Supabase Realtime can be added on top.
- The `orders.room` column has a foreign key to `rooms.number`, so you can't log a work order against an apartment number that doesn't exist.
