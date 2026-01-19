"use client";

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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { useSignupData } from "@/hooks/useSignupData";
import { usePathname, useRouter } from "next/navigation";
import { signupSteps } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { normalizeFormData } from "@/utils/normalizeFormData";

const stepActionMap: Record<string, (data: any) => any> = {
  "/signup/steps/parent-information": saveParentInformation,
  "/signup/steps/child-information": saveChildInformation,
  "/signup/steps/how-their-breathing-behaves": saveHowTheirBreathingBehaves,
  "/signup/steps/home-and-school-environment": saveHomeAndSchoolEnvironment,
  "/signup/steps/allergies-and-sensitivities": saveAllergiesAndSensitivities,
  "/signup/steps/indoor-air": saveIndoorAir,
  "/signup/steps/illness-and-recovery-tendencies": saveIllnessAndRecoveryTendencies,
  "/signup/steps/your-experience-as-a-parent": saveYourExperienceAsAParent,
};

const ContinueButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { getAllSignupData } = useSignupData();
  const { validateCurrentForm, getCurrentFormValues } = useSignupForm();

  const currentStepIndex = signupSteps.findIndex(
    (step) => step.href === pathname
  );

  const isLastStep = currentStepIndex === signupSteps.length - 1;

  const handleContinue = async () => {
    const isValid = await validateCurrentForm();

    if (!isValid) {
      return;
    }

    const formValues = getCurrentFormValues();
    const saveAction = stepActionMap[pathname];

    if (formValues && saveAction) {
      // Normalize form data (trim strings) before saving to Redux
      const normalizedValues = normalizeFormData(formValues);
      dispatch(saveAction(normalizedValues));
    }

    if (isLastStep) {
      getAllSignupData();
      router.push("/signup/success");
      return;
    }

    const nextStep = signupSteps[currentStepIndex + 1];
    if (nextStep) {
      router.push(nextStep.href);
    }
  };

  return (
    <Button
      variant="default"
      size="lg"
      className="w-fit px-5! py-3.5! text-base!"
      onClick={handleContinue}
    >
      {isLastStep ? "Submit" : "Continue"}
    </Button>
  );
};

export default ContinueButton;
