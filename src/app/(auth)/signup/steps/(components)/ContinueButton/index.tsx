"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signupSteps } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";

const ContinueButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { validateCurrentForm } = useSignupForm();

  const currentStepIndex = signupSteps.findIndex(
    (step) => step.href === pathname
  );

  const isLastStep = currentStepIndex === signupSteps.length - 1;

  const handleContinue = async () => {
    const isValid = await validateCurrentForm();
    
    if (!isValid) {
      return;
    }

    if (isLastStep) {
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
