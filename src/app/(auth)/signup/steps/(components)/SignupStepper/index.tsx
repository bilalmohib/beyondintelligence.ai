"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Stepper,
  StepperNav,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
} from "@/components/ui/stepper";
import { Heading6, Paragraph } from "@/components/common/Typography";
import { SignupStep } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";

interface SignupStepperProps {
  steps: SignupStep[];
}

const SignupStepper = ({ steps }: SignupStepperProps) => {
  const pathname = usePathname();

  // Determine current step based on pathname
  const currentStep =
    steps.find((step) => pathname === step.href)?.id ?? 1;

  return (
    <Stepper value={currentStep} orientation="horizontal" className="w-full">
      <StepperNav className="w-full flex">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex items-start">
            <div className="flex flex-col items-center gap-2 flex-1">
              <StepperItem
                step={step.id}
                completed={step.completed}
                disabled={!step.active && !step.completed}
              >
                <StepperTrigger asChild>
                  <Link href={step.href}>
                    <StepperIndicator className="size-[70px] rounded-full border-2 border-background bg-white text-input-text-color data-[state=completed]:bg-primary data-[state=completed]:text-white data-[state=completed]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary cursor-pointer">
                      <Heading6 className="text-center text-inherit">
                        {step.stepValue}
                      </Heading6>
                    </StepperIndicator>
                  </Link>
                </StepperTrigger>
              </StepperItem>
              <Link href={step.href}>
                <Paragraph className="text-center text-white font-semibold text-[13px]! leading-[120%] tracking-[0%] max-w-[120px] cursor-pointer hover:opacity-80 transition-opacity">
                  {step.title}
                </Paragraph>
              </Link>
            </div>

            {index < steps.length - 1 && (
              <div className="w-[23px] h-0 border-t-2 border-white shrink mt-[35px]" />
            )}
          </div>
        ))}
      </StepperNav>
    </Stepper>
  );
};

export default SignupStepper;
