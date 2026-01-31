import { useEffect, useRef } from 'react';
import { UseFormReset } from 'react-hook-form';

export function useFormSyncWithRedux<T extends Record<string, unknown>>(
  savedData: Record<string, unknown> | undefined,
  reset: UseFormReset<T>,
  defaultValues: Partial<T> | T
): void {
  const hasInitializedRef = useRef(false);
  const previousSavedDataRef = useRef<string | null>(null);

  useEffect(() => {
    const currentSavedDataStr = savedData ? JSON.stringify(savedData) : null;

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      previousSavedDataRef.current = currentSavedDataStr;

      if (savedData && Object.keys(savedData).length > 0) {
        reset(defaultValues as T, { keepDirtyValues: false });
      }
      return;
    }

    if (currentSavedDataStr !== previousSavedDataRef.current) {
      previousSavedDataRef.current = currentSavedDataStr;

      if (savedData && Object.keys(savedData).length > 0) {
        reset(defaultValues as T, { keepDirtyValues: true });
      }
    }
  }, [savedData, reset, defaultValues]);
}
