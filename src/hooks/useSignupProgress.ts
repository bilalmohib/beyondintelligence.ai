import { useCallback, useState } from 'react';

const SIGNUP_FORM_DATA_KEY = 'satori_signup_form_data';
const SIGNUP_LAST_STEP_KEY = 'satori_signup_last_step';
const SIGNUP_COMPLETED_STEPS_KEY = 'satori_signup_completed_steps';

export const SIGNUP_PATHNAME_TO_KEY: Record<string, string> = {
  '/signup/steps/parent-information': 'parentInformation',
  '/signup/steps/child-information': 'childInformation',
  '/signup/steps/how-their-breathing-behaves': 'howTheirBreathingBehaves',
  '/signup/steps/home-and-school-environment': 'homeAndSchoolEnvironment',
  '/signup/steps/allergies-and-sensitivities': 'allergiesAndSensitivities',
  '/signup/steps/indoor-air': 'indoorAir',
  '/signup/steps/illness-and-recovery-tendencies': 'illnessAndRecoveryTendencies',
  '/signup/steps/your-experience-as-a-parent': 'yourExperienceAsAParent',
};

export const SIGNUP_STEPS_ORDER = [
  { pathname: '/signup/steps/parent-information', key: 'parentInformation' },
  { pathname: '/signup/steps/child-information', key: 'childInformation' },
  { pathname: '/signup/steps/how-their-breathing-behaves', key: 'howTheirBreathingBehaves' },
  { pathname: '/signup/steps/home-and-school-environment', key: 'homeAndSchoolEnvironment' },
  { pathname: '/signup/steps/allergies-and-sensitivities', key: 'allergiesAndSensitivities' },
  { pathname: '/signup/steps/indoor-air', key: 'indoorAir' },
  { pathname: '/signup/steps/illness-and-recovery-tendencies', key: 'illnessAndRecoveryTendencies' },
  { pathname: '/signup/steps/your-experience-as-a-parent', key: 'yourExperienceAsAParent' },
];

export type SignupFormDataPersisted = Record<string, unknown>;

export const useSignupProgress = () => {
  const [lastStep, setLastStep] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignupFormDataPersisted | null>(null);

  const getSavedFormData = useCallback((): SignupFormDataPersisted | null => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(SIGNUP_FORM_DATA_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SignupFormDataPersisted;
    } catch {
      return null;
    }
  }, []);

  const getLastStep = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SIGNUP_LAST_STEP_KEY);
  }, []);

  const saveFormData = useCallback((data: SignupFormDataPersisted) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SIGNUP_FORM_DATA_KEY, JSON.stringify(data));
    setFormData(data);
  }, []);

  const saveLastStep = useCallback((pathname: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SIGNUP_LAST_STEP_KEY, pathname);
    setLastStep(pathname);
  }, []);

  const saveStepDraft = useCallback((pathname: string, values: unknown) => {
    if (typeof window === 'undefined' || !values) return;
    const key = SIGNUP_PATHNAME_TO_KEY[pathname];
    if (!key) return;
    const existing = getSavedFormData() || {};
    const updated = { ...existing, [key]: values };
    localStorage.setItem(SIGNUP_FORM_DATA_KEY, JSON.stringify(updated));
    setFormData(updated);
  }, [getSavedFormData]);

  const clearProgress = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SIGNUP_FORM_DATA_KEY);
    localStorage.removeItem(SIGNUP_LAST_STEP_KEY);
    localStorage.removeItem(SIGNUP_COMPLETED_STEPS_KEY);
    setFormData(null);
    setLastStep(null);
  }, []);

  const getSavedCompletedSteps = useCallback((): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(SIGNUP_COMPLETED_STEPS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const getStepToContinue = useCallback((): string => {
    const completed = getSavedCompletedSteps();

    // Find the first step whose key is NOT in completedSteps
    for (let i = 0; i < SIGNUP_STEPS_ORDER.length; i++) {
      if (!completed.includes(SIGNUP_STEPS_ORDER[i].key)) {
        return SIGNUP_STEPS_ORDER[i].pathname;
      }
    }

    // All steps complete — go to last step
    return SIGNUP_STEPS_ORDER[SIGNUP_STEPS_ORDER.length - 1].pathname;
  }, [getSavedCompletedSteps]);

  return {
    getSavedFormData,
    getLastStep,
    saveFormData,
    saveLastStep,
    saveStepDraft,
    clearProgress,
    getStepToContinue,
    lastStep,
    formData,
  };
};

export default useSignupProgress;
