"use client";

import Container from "@/components/common/Container";
import { Heading4 } from "@/components/common/Typography";
import StepTitle from "@/app/(auth)/signup/steps/(components)/StepTitle";
import SignupStepper from "@/app/(auth)/signup/steps/(components)/SignupStepper";
import ContinueButton from "@/app/(auth)/signup/steps/(components)/ContinueButton";
import { SignupFormProvider } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { signupSteps } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";

interface SignupStepsLayoutProps {
  children: React.ReactNode;
}

const SignupStepsLayout = ({ children }: SignupStepsLayoutProps) => {
  return (
    <SignupFormProvider>
      <div>
        <Container>
          <div className="flex flex-col gap-8 py-8">
            <Heading4 className="text-white">
              Create your child's Satori account
            </Heading4>
            <div className="bg-background-secondary p-24 rounded-[20px] flex flex-col gap-24">
              <SignupStepper steps={signupSteps} />

              <div className="flex flex-col gap-10">
                <StepTitle />

                {children}

                <div className="flex justify-end">
                  <ContinueButton />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </SignupFormProvider>
  );
};

export default SignupStepsLayout;
