import { useCallback, useEffect, useState } from 'react';

const SIGNUP_COMPLETION_KEY = 'satori_signup_completed';
const SIGNUP_COMPLETION_TIMESTAMP_KEY = 'satori_signup_timestamp';

interface SignupCompletionData {
  isComplete: boolean;
  timestamp: number | null;
  userId: string | null;
}

export const useSignupCompletion = () => {
  const [isSignupComplete, setIsSignupComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [completionData, setCompletionData] = useState<SignupCompletionData>({
    isComplete: false,
    timestamp: null,
    userId: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(SIGNUP_COMPLETION_KEY);
      const timestamp = localStorage.getItem(SIGNUP_COMPLETION_TIMESTAMP_KEY);
      
      if (stored === 'true') {
        setIsSignupComplete(true);
        setCompletionData({
          isComplete: true,
          timestamp: timestamp ? parseInt(timestamp, 10) : null,
          userId: localStorage.getItem('satori_user_id'),
        });
      }
      setIsLoading(false);
    }
  }, []);

  const markSignupComplete = useCallback((userId?: string) => {
    if (typeof window !== 'undefined') {
      const now = Date.now();
      localStorage.setItem(SIGNUP_COMPLETION_KEY, 'true');
      localStorage.setItem(SIGNUP_COMPLETION_TIMESTAMP_KEY, now.toString());
      if (userId) {
        localStorage.setItem('satori_user_id', userId);
      }
      
      setIsSignupComplete(true);
      setCompletionData({
        isComplete: true,
        timestamp: now,
        userId: userId || null,
      });
    }
  }, []);

  const clearSignupCompletion = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SIGNUP_COMPLETION_KEY);
      localStorage.removeItem(SIGNUP_COMPLETION_TIMESTAMP_KEY);
      localStorage.removeItem('satori_user_id');
      
      setIsSignupComplete(false);
      setCompletionData({
        isComplete: false,
        timestamp: null,
        userId: null,
      });
    }
  }, []);

  return {
    isSignupComplete,
    isLoading,
    completionData,
    markSignupComplete,
    clearSignupCompletion,
  };
};

export default useSignupCompletion;
