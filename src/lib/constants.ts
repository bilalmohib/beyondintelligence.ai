export const AUTH_ROUTES = [
    "/login", 
    "/register"
];

// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://staging-alb-313415913.us-east-1.elb.amazonaws.com',
    PORT: 80,
    ENDPOINTS: {
        SIGNUP: '/v1/signup',
    },
} as const;