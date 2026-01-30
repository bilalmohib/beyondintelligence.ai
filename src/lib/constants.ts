export const AUTH_ROUTES = [
    "/login", 
    "/register"
];

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const API_CONFIG = {
    BASE_URL: baseUrl,
    PORT: 80,
    ENDPOINTS: {
        SIGNUP: baseUrl ? '/v1/signup' : '/api/v1/signup',
    },
} as const;