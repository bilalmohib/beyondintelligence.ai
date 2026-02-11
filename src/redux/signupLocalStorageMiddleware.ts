import { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './store';

const SIGNUP_FORM_DATA_KEY = 'satori_signup_form_data';
const SIGNUP_COMPLETED_STEPS_KEY = 'satori_signup_completed_steps';

let saveTimeoutId: ReturnType<typeof setTimeout> | null = null;

export const signupLocalStorageMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  const result = next(action);

  if (typeof action === 'object' && action !== null && 'type' in action) {
    const actionType = (action as { type: string }).type;
    if (actionType.startsWith('signup/') && !actionType.includes('reset')) {
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
      }

      saveTimeoutId = setTimeout(() => {
        try {
          const state = store.getState() as RootState;
          const formData = state.signup.formData;

          if (formData && Object.keys(formData).length > 0) {
            localStorage.setItem(SIGNUP_FORM_DATA_KEY, JSON.stringify(formData));
          }

          const completedSteps = state.signup.completedSteps;
          if (completedSteps && completedSteps.length > 0) {
            localStorage.setItem(SIGNUP_COMPLETED_STEPS_KEY, JSON.stringify(completedSteps));
          }
        } catch (error) {
          console.warn('Failed to sync signup data to localStorage:', error);
        }
        saveTimeoutId = null;
      }, 300);
    }
  }

  return result;
};
