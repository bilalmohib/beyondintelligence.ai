"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import { Heading4, Paragraph } from "@/components/common/Typography";
import StepTitle from "@/app/(auth)/signup/steps/(components)/StepTitle";
import SignupStepper from "@/app/(auth)/signup/steps/(components)/SignupStepper";
import ContinueButton from "@/app/(auth)/signup/steps/(components)/ContinueButton";
import { SignupFormProvider } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { signupSteps } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";
import { SignupProgressRestore } from "@/app/(auth)/signup/steps/(components)/SignupProgressRestore";
import { SaveProgressOnLeave } from "@/app/(auth)/signup/steps/(components)/SaveProgressOnLeave";
import { useSignupCompletion } from "@/hooks/useSignupCompletion";
import { Loader2 } from "lucide-react";

interface SignupStepsLayoutProps {
  children: React.ReactNode;
}

const SignupStepsLayout = ({ children }: SignupStepsLayoutProps) => {
  const router = useRouter();
  const { isSignupComplete, isLoading } = useSignupCompletion();

  // Redirect to success page if signup is already complete
  useEffect(() => {
    if (!isLoading && isSignupComplete) {
      router.replace("/signup/success");
    }
  }, [isLoading, isSignupComplete, router]);

  // Show loading state while checking completion status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <Paragraph className="text-white">Loading...</Paragraph>
        </div>
      </div>
    );
  }

  // If signup is complete, show redirecting message (will redirect via useEffect)
  if (isSignupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <Paragraph className="text-white">Redirecting to your account...</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignupProgressRestore />
      <SignupFormProvider>
        <SaveProgressOnLeave />
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
    </>
  );
};

export default SignupStepsLayout;
