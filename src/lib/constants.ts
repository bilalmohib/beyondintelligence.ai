export const AUTH_ROUTES = [
    "/login", 
    "/register"
];

// Client always uses same-origin proxy to avoid mixed content (HTTPS→HTTP) and CORS.
// The /api/v1/signup route proxies to the backend using API_BASE_URL (server-side).
export const API_CONFIG = {
    BASE_URL: '',
    PORT: 80,
    ENDPOINTS: {
        SIGNUP: '/api/v1/signup',
    },
} as const;