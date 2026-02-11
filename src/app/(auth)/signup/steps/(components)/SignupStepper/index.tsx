"use client";

import {
  Stepper,
  StepperNav,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
} from "@/components/ui/stepper";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import type { RootState } from "@/redux/store";
import { selectCompletedSteps } from "@/redux/slices/signupSlice";
import { Heading6, Paragraph } from "@/components/common/Typography";
import { SignupStep } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";

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

interface SignupStepperProps {
  steps: SignupStep[];
}

const SignupStepper = ({ steps }: SignupStepperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const completedSteps = useSelector((state: RootState) =>
    selectCompletedSteps(state)
  );

  const currentStepIndex = steps.findIndex((step) => pathname === step.href);
  const safeCurrentStepIndex = currentStepIndex >= 0 ? currentStepIndex : 0;
  const currentStep = steps.find((step) => pathname === step.href)?.id ?? 1;

  /** A step is completed only when the user clicked Continue and validation passed. */
  const isStepCompleted = (idx: number) => {
    const key = STEP_FORM_KEYS[idx];
    return key ? completedSteps.includes(key) : false;
  };

  /**
   * Highest step the user may visit = first step that has NOT been completed.
   * All steps before it must be completed.
   */
  const getMaxAllowedStepIndex = () => {
    for (let i = 0; i < STEP_FORM_KEYS.length; i++) {
      if (!isStepCompleted(i)) return i;
    }
    return STEP_FORM_KEYS.length - 1;
  };

  const handleStepClick = (stepIndex: number, href: string) => {
    // Always allow navigating backward or to the current step
    if (stepIndex <= safeCurrentStepIndex) {
      router.push(href);
      return;
    }

    // Forward navigation: ALL previous steps must be completed
    const maxAllowed = getMaxAllowedStepIndex();
    if (stepIndex <= maxAllowed) {
      router.push(href);
      return;
    }

    // Block navigation
    toast("Please complete the current step first before moving ahead.", {
      duration: 4000,
      icon: "⚠️",
      style: {
        background: "#F59E0B",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#F59E0B",
      },
    });
  };

  return (
    <Stepper value={currentStep} orientation="horizontal" className="w-full">
      <StepperNav className="w-full flex">
        {steps.map((step, index) => {
          const isCompleted = isStepCompleted(index);

          return (
            <div key={step.id} className="flex-1 flex items-start">
              <div className="flex flex-col items-center gap-2 flex-1">
                <StepperItem
                  step={step.id}
                  completed={isCompleted}
                  disabled={false}
                >
                  <StepperTrigger asChild>
                    <button
                      type="button"
                      onClick={() => handleStepClick(index, step.href)}
                      aria-current={index === safeCurrentStepIndex ? "step" : undefined}
                    >
                      <StepperIndicator className={`size-[70px] rounded-full border-2 border-background bg-white text-input-text data-[state=completed]:bg-primary data-[state=completed]:text-white data-[state=completed]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary cursor-pointer ${index === safeCurrentStepIndex ? "ring-[0.5px] ring-white" : ""}`}>
                        <Heading6 className="text-center text-inherit">
                          {step.stepValue}
                        </Heading6>
                      </StepperIndicator>
                    </button>
                  </StepperTrigger>
                </StepperItem>
                <button
                  type="button"
                  onClick={() => handleStepClick(index, step.href)}
                  className="block"
                >
                  <Paragraph className="text-center text-white font-semibold text-[13px]! leading-[120%] tracking-[0%] max-w-[120px] cursor-pointer hover:opacity-80 transition-opacity">
                    {step.title}
                  </Paragraph>
                </button>
              </div>

              {index < steps.length - 1 && (
                <div className="w-[23px] h-0 border-t-2 border-white shrink mt-[35px]" />
              )}
            </div>
          );
        })}
      </StepperNav>
    </Stepper>
  );
};
export default SignupStepper;
