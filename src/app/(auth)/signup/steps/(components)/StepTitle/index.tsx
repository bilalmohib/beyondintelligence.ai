"use client";

import { usePathname } from "next/navigation";
import { Heading2 } from "@/components/common/Typography";
import { signupSteps } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";

const StepTitle = () => {
  const pathname = usePathname();
  const currentStep = signupSteps.find((step) => step.href === pathname);
  const stepTitle = currentStep?.title ?? "Signup";

  return <Heading2 className="text-white">{stepTitle}</Heading2>;
};

export default StepTitle;
