// On Vercel, the frontend and the /api serverless functions are served from the
// same domain, so an empty base URL means "call /api/... on this same origin".
// Only override this if you split the frontend and backend across different domains.
const API_BASE_URL = window.API_BASE_URL_OVERRIDE || '';
