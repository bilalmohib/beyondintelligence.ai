"use client";

import { useLayoutEffect, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  saveParentInformation,
  saveChildInformation,
  saveHowTheirBreathingBehaves,
  saveHomeAndSchoolEnvironment,
  saveAllergiesAndSensitivities,
  saveIndoorAir,
  saveIllnessAndRecoveryTendencies,
  saveYourExperienceAsAParent,
  setCompletedSteps,
  selectCompletedSteps,
} from "@/redux/slices/signupSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useSignupProgress, SIGNUP_STEPS_ORDER } from "@/hooks/useSignupProgress";

const SIGNUP_COMPLETED_STEPS_KEY = "satori_signup_completed_steps";

const STEP_FORM_KEYS = [
  "parentInformation",
  "childInformation",
  "howTheirBreathingBehaves",
  "homeAndSchoolEnvironment",
  "allergiesAndSensitivities",
  "indoorAir",
  "illnessAndRecoveryTendencies",
  "yourExperienceAsAParent",
] as const;

export const SignupProgressRestore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const completedSteps = useSelector((state: RootState) =>
    selectCompletedSteps(state)
  );
  const { getSavedFormData, getStepToContinue, saveLastStep } =
    useSignupProgress();

  // Restore saved data + completedSteps from localStorage into Redux on mount
  useLayoutEffect(() => {
    const saved = getSavedFormData();
    if (saved) {
      if (saved.parentInformation)
        dispatch(saveParentInformation(saved.parentInformation as any));
      if (saved.childInformation)
        dispatch(saveChildInformation(saved.childInformation as any));
      if (saved.howTheirBreathingBehaves)
        dispatch(
          saveHowTheirBreathingBehaves(saved.howTheirBreathingBehaves as any)
        );
      if (saved.homeAndSchoolEnvironment)
        dispatch(
          saveHomeAndSchoolEnvironment(saved.homeAndSchoolEnvironment as any)
        );
      if (saved.allergiesAndSensitivities)
        dispatch(
          saveAllergiesAndSensitivities(saved.allergiesAndSensitivities as any)
        );
      if (saved.indoorAir) dispatch(saveIndoorAir(saved.indoorAir as any));
      if (saved.illnessAndRecoveryTendencies)
        dispatch(
          saveIllnessAndRecoveryTendencies(
            saved.illnessAndRecoveryTendencies as any
          )
        );
      if (saved.yourExperienceAsAParent)
        dispatch(
          saveYourExperienceAsAParent(saved.yourExperienceAsAParent as any)
        );
    }

    // Restore completedSteps from localStorage
    try {
      const raw = localStorage.getItem(SIGNUP_COMPLETED_STEPS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          dispatch(setCompletedSteps(parsed));
        }
      }
    } catch {
      // ignore parse errors
    }

    const stepToContinue = getStepToContinue();
    if (stepToContinue && stepToContinue !== pathname) {
      router.replace(stepToContinue);
    }
  }, []);

  // Guard: on every pathname change, verify the user is allowed to be here.
  // ALL previous steps must be in completedSteps; otherwise redirect.
  useEffect(() => {
    saveLastStep(pathname);

    const currentStepIndex = SIGNUP_STEPS_ORDER.findIndex(
      (s) => s.pathname === pathname
    );

    // First step or unrecognised page — nothing to guard
    if (currentStepIndex <= 0) return;

    // Every step before the current one must be completed
    for (let i = 0; i < currentStepIndex; i++) {
      const key = STEP_FORM_KEYS[i];
      if (!completedSteps.includes(key)) {
        router.replace(SIGNUP_STEPS_ORDER[i].pathname);
        return;
      }
    }
  }, [pathname, completedSteps, saveLastStep, router]);

  return null;
};
