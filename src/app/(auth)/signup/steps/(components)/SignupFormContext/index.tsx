"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SignupFormContextType {
  registerForm: (validateFn: () => Promise<boolean>, getValuesFn?: () => any) => void;
  unregisterForm: () => void;
  validateCurrentForm: () => Promise<boolean>;
  getCurrentFormValues: () => any;
  hasRegisteredForm: boolean;
}

const SignupFormContext = createContext<SignupFormContextType | null>(null);

export const SignupFormProvider = ({ children }: { children: ReactNode }) => {
  const [validateFn, setValidateFn] = useState<(() => Promise<boolean>) | null>(null);
  const [getValuesFn, setGetValuesFn] = useState<(() => any) | null>(null);

  const registerForm = useCallback((fn: () => Promise<boolean>, getValues?: () => any) => {
    setValidateFn(() => fn);
    setGetValuesFn(() => getValues || (() => null));
  }, []);

  const unregisterForm = useCallback(() => {
    setValidateFn(null);
    setGetValuesFn(null);
  }, []);

  const validateCurrentForm = useCallback(async () => {
    if (validateFn) {
      return await validateFn();
    }
    return true;
  }, [validateFn]);

  const getCurrentFormValues = useCallback(() => {
    if (getValuesFn) {
      return getValuesFn();
    }
    return null;
  }, [getValuesFn]);

  return (
    <SignupFormContext.Provider
      value={{
        registerForm,
        unregisterForm,
        validateCurrentForm,
        getCurrentFormValues,
        hasRegisteredForm: validateFn !== null,
      }}
    >
      {children}
    </SignupFormContext.Provider>
  );
};

export const useSignupForm = () => {
  const context = useContext(SignupFormContext);
  if (!context) {
    throw new Error("useSignupForm must be used within a SignupFormProvider");
  }
  return context;
};
