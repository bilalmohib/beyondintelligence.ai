"use client";

import { useLayoutEffect, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  saveParentInformation,
  saveChildInformation,
  saveHowTheirBreathingBehaves,
  saveHomeAndSchoolEnvironment,
  saveAllergiesAndSensitivities,
  saveIndoorAir,
  saveIllnessAndRecoveryTendencies,
  saveYourExperienceAsAParent,
} from "@/redux/slices/signupSlice";
import type { AppDispatch } from "@/redux/store";
import { useSignupProgress } from "@/hooks/useSignupProgress";

export const SignupProgressRestore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const { getSavedFormData, getStepToContinue, saveLastStep } = useSignupProgress();

  useLayoutEffect(() => {
    const saved = getSavedFormData();
    if (saved) {
      if (saved.parentInformation) {
        dispatch(saveParentInformation(saved.parentInformation as any));
      }
      if (saved.childInformation) {
        dispatch(saveChildInformation(saved.childInformation as any));
      }
      if (saved.howTheirBreathingBehaves) {
        dispatch(saveHowTheirBreathingBehaves(saved.howTheirBreathingBehaves as any));
      }
      if (saved.homeAndSchoolEnvironment) {
        dispatch(saveHomeAndSchoolEnvironment(saved.homeAndSchoolEnvironment as any));
      }
      if (saved.allergiesAndSensitivities) {
        dispatch(saveAllergiesAndSensitivities(saved.allergiesAndSensitivities as any));
      }
      if (saved.indoorAir) {
        dispatch(saveIndoorAir(saved.indoorAir as any));
      }
      if (saved.illnessAndRecoveryTendencies) {
        dispatch(saveIllnessAndRecoveryTendencies(saved.illnessAndRecoveryTendencies as any));
      }
      if (saved.yourExperienceAsAParent) {
        dispatch(saveYourExperienceAsAParent(saved.yourExperienceAsAParent as any));
      }
    }

    // Navigate to the step where user should continue (first incomplete step)
    const stepToContinue = getStepToContinue();
    if (stepToContinue && stepToContinue !== pathname) {
      router.replace(stepToContinue);
    }
  }, []);

  useEffect(() => {
    saveLastStep(pathname);
  }, [pathname, saveLastStep]);

  return null;
};
