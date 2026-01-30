"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Stepper,
  StepperNav,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
} from "@/components/ui/stepper";
import { Heading6, Paragraph } from "@/components/common/Typography";
import { SignupStep } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";
import { selectSignupData } from "@/redux/slices/signupSlice";
import type { RootState } from "@/redux/store";

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
  const pathname = usePathname();
  const formData = useSelector((state: RootState) => selectSignupData(state));

  const currentStepIndex = steps.findIndex((step) => pathname === step.href);
  const safeCurrentStepIndex = currentStepIndex >= 0 ? currentStepIndex : 0;
  const currentStep = steps.find((step) => pathname === step.href)?.id ?? 1;

  const stepHasSavedData = (idx: number) => {
    const key = STEP_FORM_KEYS[idx];
    const data = key ? formData[key] : null;
    if (data == null) return false;
    if (typeof data !== "object") return true;
    return Object.keys(data).length > 0;
  };

  const handleStepClick = (e: React.MouseEvent, stepIndex: number) => {
    if (stepIndex <= safeCurrentStepIndex) return;
    if (stepHasSavedData(stepIndex)) return;

    e.preventDefault();
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
          const formKey = STEP_FORM_KEYS[index];
          const hasData = formKey && formData[formKey] != null;
          const isCompleted = hasData || index < safeCurrentStepIndex;

          return (
            <div key={step.id} className="flex-1 flex items-start">
              <div className="flex flex-col items-center gap-2 flex-1">
                <StepperItem
                  step={step.id}
                  completed={isCompleted}
                  disabled={false}
                >
                  <StepperTrigger asChild>
                    <Link
                      href={step.href}
                      onClick={(e) => handleStepClick(e, index)}
                      aria-current={index === safeCurrentStepIndex ? "step" : undefined}
                    >
                      <StepperIndicator className={`size-[70px] rounded-full border-2 border-background bg-white text-input-text data-[state=completed]:bg-primary data-[state=completed]:text-white data-[state=completed]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary cursor-pointer ${index === safeCurrentStepIndex ? "ring-[0.5px] ring-white" : ""}`}>
                        <Heading6 className="text-center text-inherit">
                          {step.stepValue}
                        </Heading6>
                      </StepperIndicator>
                    </Link>
                  </StepperTrigger>
                </StepperItem>
                <Link
                  href={step.href}
                  onClick={(e) => handleStepClick(e, index)}
                  className="block"
                >
                  <Paragraph className="text-center text-white font-semibold text-[13px]! leading-[120%] tracking-[0%] max-w-[120px] cursor-pointer hover:opacity-80 transition-opacity">
                    {step.title}
                  </Paragraph>
                </Link>
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
