export const AUTH_ROUTES = [
    "/login", 
    "/register"
];

// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL!,
    PORT: 80,
    ENDPOINTS: {
        SIGNUP: '/v1/signup',
    },
} as const;