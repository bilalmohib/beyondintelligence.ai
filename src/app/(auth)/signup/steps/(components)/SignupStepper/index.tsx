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
  currentStep?: number;
}

const SignupStepper = ({ steps, currentStep = 1 }: SignupStepperProps) => {
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
                  <StepperIndicator className="size-[70px] rounded-full border-2 border-background bg-white text-input-text-color data-[state=completed]:bg-primary data-[state=completed]:text-white data-[state=completed]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary">
                    <Heading6 className="text-center text-inherit">
                      {step.stepValue}
                    </Heading6>
                  </StepperIndicator>
                </StepperTrigger>
              </StepperItem>
              <Paragraph className="text-center text-white font-semibold text-[13px]! leading-[120%] tracking-[0%] max-w-[120px]">
                {step.title}
              </Paragraph>
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
