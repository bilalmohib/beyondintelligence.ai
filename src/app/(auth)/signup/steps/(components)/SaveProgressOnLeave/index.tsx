"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { useSignupProgress } from "@/hooks/useSignupProgress";

export const SaveProgressOnLeave = () => {
  const pathname = usePathname();
  const { getCurrentFormValues } = useSignupForm();
  const { saveStepDraft } = useSignupProgress();

  useEffect(() => {
    const onBeforeUnload = () => {
      const values = getCurrentFormValues();
      if (values) {
        saveStepDraft(pathname, values);
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [pathname, getCurrentFormValues, saveStepDraft]);

  return null;
};
