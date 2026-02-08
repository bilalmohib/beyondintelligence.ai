import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/lib/constants';

export type SignupRequest = {
  // --- Core Identity ---
  lob_id: string;
  parent_full_name: string;
  parent_email: string;
  parent_phone: string;
  child_name: string;
  child_age_years: number;
  // --- Consents ---
  sms_consent: boolean;
  home_alerts?: boolean;
  // --- Addresses ---
  home_address: string;
  school_address: string;
  postal_code: string;
  // --- Health & Lifestyle (STRICT ENUMS) ---
  severity: 'mild' | 'moderate' | 'severe' | 'not_sure';
  child_worse_when:
    | 'early_morning' | 'late_morning' | 'midday'
    | 'late_afternoon' | 'evening' | 'night' | 'not_sure';
  most_active_time:
    | 'early_morning' | 'late_morning' | 'midday'
    | 'late_afternoon' | 'evening' | 'night' | 'not_sure';
  lifestyle: 'mostly_indoors' | 'mostly_outdoors';
  plays_sports: 'yes' | 'no';
  has_allergies: 'yes' | 'no' | 'not_sure';
  pets_at_home: 'dog' | 'cat' | 'both' | 'other' | 'none';
  home_humidity: 'low' | 'normal' | 'high';
  home_humidity_feel: 'too_dry' | 'comfortable' | 'too_humid';
  // --- Optional Flags ---
  home_moisture_issues?: boolean;
  has_gas_stove?: boolean;
  has_purifier?: boolean;
  illness_prone?: boolean;
  recent_illness?: boolean;
  // --- Flexible Arrays ---
  triggers?: string[];
  symptoms?: string[];
  allergies?: string[];
  parent_unavailable_windows?: string[];
  parent_worries?: string[];
};

export type SignupResponse = {
  user_id: string;
  status: 'created';
  enrollment_state: 'pending_verification' | 'active' | 'billing_pending';
  next_step: 'text_hi' | 'verify_phone' | 'complete' | 'billing_retry';
  billing_status: 'trialing' | 'trial_pending' | 'failed' | 'disabled';
  anchors: Record<string, unknown>;
  station_bindings: Record<string, unknown>;
  enrichment: {
    status: 'complete' | 'partial' | 'pending';
    missing: string[];
  };
};

export const signupApiSlice = createApi({
  reducerPath: 'signupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (signupData) => ({
        url: API_CONFIG.ENDPOINTS.SIGNUP,
        method: 'POST',
        body: signupData,
      }),
    }),
  }),
});

export const { useSignupMutation } = signupApiSlice;
