import { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './store';

const SIGNUP_FORM_DATA_KEY = 'satori_signup_form_data';

// Debounce timeout reference
let saveTimeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Lightweight middleware that auto-syncs signup formData to localStorage.
 * Uses debouncing (300ms) to prevent excessive writes and maintain performance.
 * Only syncs on signup-related actions.
 */
export const signupLocalStorageMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  const result = next(action);

  // Only sync for signup-related actions
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const actionType = (action as { type: string }).type;
    if (actionType.startsWith('signup/') && !actionType.includes('reset')) {
      // Debounce the save to prevent excessive writes
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
      }

      saveTimeoutId = setTimeout(() => {
        try {
          const state = store.getState() as RootState;
          const formData = state.signup.formData;
          
          // Only save if there's actual data
          if (formData && Object.keys(formData).length > 0) {
            localStorage.setItem(SIGNUP_FORM_DATA_KEY, JSON.stringify(formData));
          }
        } catch (error) {
          // Silently fail - localStorage might be full or unavailable
          console.warn('Failed to sync signup data to localStorage:', error);
        }
        saveTimeoutId = null;
      }, 300);
    }
  }

  return result;
};
