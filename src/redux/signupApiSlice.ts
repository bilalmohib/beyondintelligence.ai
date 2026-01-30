import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/lib/constants';

export type SignupRequest = {
  lob_id: string;
  home_alerts: boolean;
  parent_full_name: string;
  parent_email: string;
  parent_phone: string;
  sms_consent: boolean;
  child_name: string;
  child_age_years: number;
  severity: 'mild' | 'moderate' | 'severe' | 'not_sure';
  child_worse_when: string;
  triggers: string[];
  symptoms: string[];
  lifestyle: 'mostly_indoors' | 'mostly_outdoors' | 'mixed';
  most_active_time: string;
  plays_sports: 'yes' | 'no';
  parent_unavailable_windows: string[];
  home_address: string;
  school_address: string;
  postal_code: string;
  has_allergies: 'yes' | 'no' | 'not_sure';
  allergies: string[];
  pets_at_home: 'dog' | 'cat' | 'both' | 'other' | 'none';
  home_humidity: 'low' | 'normal' | 'high';
  home_humidity_feel: 'too_dry' | 'comfortable' | 'too_humid';
  home_moisture_issues: boolean;
  has_gas_stove: boolean;
  has_purifier: boolean;
  illness_prone: boolean;
  recent_illness: boolean;
  parent_worries: string[];
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
