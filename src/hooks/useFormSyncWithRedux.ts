import { useEffect, useRef } from 'react';
import { UseFormReset } from 'react-hook-form';

/**
 * Hook that syncs form values with Redux state.
 * Resets the form when Redux data changes (e.g., when navigating back to a step).
 * Uses a ref to track if this is the initial mount to avoid unnecessary resets.
 * 
 * @param savedData - The saved data from Redux store
 * @param reset - The reset function from react-hook-form
 * @param defaultValues - The default values to reset to (derived from savedData)
 */
export function useFormSyncWithRedux<T extends Record<string, unknown>>(
  savedData: Partial<T> | undefined,
  reset: UseFormReset<T>,
  defaultValues: T
): void {
  const hasInitializedRef = useRef(false);
  const previousSavedDataRef = useRef<string | null>(null);

  useEffect(() => {
    // Serialize current savedData for comparison
    const currentSavedDataStr = savedData ? JSON.stringify(savedData) : null;
    
    // On first mount, just record the initial state
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      previousSavedDataRef.current = currentSavedDataStr;
      
      // If there's saved data on initial mount, reset to ensure form has it
      if (savedData && Object.keys(savedData).length > 0) {
        reset(defaultValues, { keepDirtyValues: false });
      }
      return;
    }
    
    // Only reset if savedData has changed (e.g., restored from localStorage)
    if (currentSavedDataStr !== previousSavedDataRef.current) {
      previousSavedDataRef.current = currentSavedDataStr;
      
      // Reset with new values, but keep any values the user might have already entered
      if (savedData && Object.keys(savedData).length > 0) {
        reset(defaultValues, { keepDirtyValues: true });
      }
    }
  }, [savedData, reset, defaultValues]);
}
