"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading1, Paragraph } from "@/components/common/Typography";
import { useSignupCompletion } from "@/hooks/useSignupCompletion";
import { useSignupProgress } from "@/hooks/useSignupProgress";
import { Loader2 } from "lucide-react";

const SignupStartPage = () => {
  const router = useRouter();
  const { isSignupComplete, isLoading } = useSignupCompletion();
  const { getLastStep } = useSignupProgress();

  // Redirect to success page if signup is already complete, or to last step if user has progress
  useEffect(() => {
    if (isLoading) return;
    if (isSignupComplete) {
      router.replace("/signup/success");
      return;
    }
    const lastStep = getLastStep();
    if (lastStep) {
      router.replace(lastStep);
    }
  }, [isLoading, isSignupComplete, getLastStep, router]);

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

  // If signup is complete or user has progress, show redirecting message (will redirect via useEffect)
  if (isSignupComplete || getLastStep()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <Paragraph className="text-white">
            {isSignupComplete ? "Redirecting to your account..." : "Taking you back to where you left off..."}
          </Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-image-signup-start rounded-[20px] bg-cover bg-center bg-no-repeat h-102.75 bg-primary">
        <Container className="flex flex-col items-left justify-center h-full">
          <div className="flex flex-col gap-3 h-fit">
            <Heading1 className="text-white">
              Create your child's Satori account
            </Heading1>
            <Paragraph className="text-white">
              Your phone becomes your security key. No app. No login.
              <br />
              Enjoy a complimentary 14-day trial no credit card required to
              begin.
            </Paragraph>
          </div>
        </Container>
      </div>
      <div className="py-24 px-12.5 flex flex-row justify-center items-center max-w-[900px] mx-auto">
        <div className="bg-background-secondary p-8 rounded-[20px] flex flex-col gap-8">
          <Paragraph className="text-white">
            The questions below are designed with great intention so Satori can
            learn your child's unique breathing patterns and daily environment.
            The more precisely we understand your home, school, and routines,
            the more Satori can transform complex environmental signals into
            hyperlocal, deeply personalized guidance tuned to your child's
            neighborhood and lifestyle.
          </Paragraph>
          <Paragraph className="text-white">
            Please take your time — every detail you share helps Satori protect
            your child more intelligently. Most parents complete this in under 5
            minutes.
          </Paragraph>
          <div className="flex justify-end">
            <Button asChild className="px-5! py-3.5! text-base!">
              <Link href="/signup/steps/parent-information">Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupStartPage;
