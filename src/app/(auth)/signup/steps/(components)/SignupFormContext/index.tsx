"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SignupFormContextType {
  registerForm: (validateFn: () => Promise<boolean>) => void;
  unregisterForm: () => void;
  validateCurrentForm: () => Promise<boolean>;
  hasRegisteredForm: boolean;
}

const SignupFormContext = createContext<SignupFormContextType | null>(null);

export const SignupFormProvider = ({ children }: { children: ReactNode }) => {
  const [validateFn, setValidateFn] = useState<(() => Promise<boolean>) | null>(null);

  const registerForm = useCallback((fn: () => Promise<boolean>) => {
    setValidateFn(() => fn);
  }, []);

  const unregisterForm = useCallback(() => {
    setValidateFn(null);
  }, []);

  const validateCurrentForm = useCallback(async () => {
    if (validateFn) {
      return await validateFn();
    }
    return true;
  }, [validateFn]);

  return (
    <SignupFormContext.Provider
      value={{
        registerForm,
        unregisterForm,
        validateCurrentForm,
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
