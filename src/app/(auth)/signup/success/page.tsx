"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCenterIcon } from "@/components/icons";
import Container from "@/components/common/Container";
import { CheckCircle2, InfoIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { useSignupCompletion } from "@/hooks/useSignupCompletion";
import { Heading1, Paragraph } from "@/components/common/Typography";
import { resetSignupData, selectSignupResponse } from "@/redux/slices/signupSlice";

const SignupSuccessPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signupResponse = useSelector((state: RootState) => selectSignupResponse(state));
  const { isSignupComplete, completionData } = useSignupCompletion();

  const isReturnVisit = isSignupComplete && !signupResponse;

  useEffect(() => {
    return () => {
      dispatch(resetSignupData());
    };
  }, [dispatch]);

  const completionDate = completionData.timestamp
    ? new Date(completionData.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div>
      <div className="bg-image-signup-start rounded-[20px] bg-cover bg-center bg-no-repeat h-102.75 bg-primary">
        <Container className="flex flex-col items-left justify-center h-full">
          <div className="flex flex-col gap-3 h-fit">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-white" />
              <Heading1 className="text-white">
                {isReturnVisit ? "Welcome back!" : "Thank you!"}
              </Heading1>
            </div>
            <Heading1 className="text-white">
              {isReturnVisit 
                ? "Your response has already been recorded."
                : "Your child's account is almost ready."}
            </Heading1>
            <Paragraph className="text-white">
              {isReturnVisit
                ? "You have already completed the signup process. Your child's Satori account is being set up."
                : "Satori now has the foundation it needs to protect your child with hyperlocal, deeply personalized environmental intelligence."}
            </Paragraph>
          </div>
        </Container>
      </div>
      <div className="py-24 px-12.5 flex flex-row justify-center items-center max-w-[900px] mx-auto">
        <div className="bg-background-secondary p-8 rounded-[20px] flex flex-col gap-8">
          {isReturnVisit && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
              <InfoIcon className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <Paragraph className="text-amber-200 text-sm! font-semibold">
                  Your response has already been recorded
                </Paragraph>
                <Paragraph className="text-amber-200/80 text-xs! mt-1">
                  You completed the signup process
                  {completionDate && ` on ${completionDate}`}.
                  If you need to make changes, please contact our support team.
                </Paragraph>
              </div>
            </div>
          )}

          {signupResponse && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <Paragraph className="text-white text-sm!">
                <span className="font-semibold">Account Status:</span>{" "}
                <span className="capitalize">{signupResponse.status}</span>
              </Paragraph>
              <Paragraph className="text-white text-sm! mt-1">
                <span className="font-semibold">Next Step:</span>{" "}
                <span className="capitalize">{signupResponse.next_step?.replace(/_/g, " ")}</span>
              </Paragraph>
            </div>
          )}

          <Paragraph className="text-white">
            Please check your SMS for a special link — your child's
            Environmental Safety Map — a powerful visualization of the
            neighborhood-level patterns Satori will monitor 24/7 to keep your
            child safer.
          </Paragraph>
          <Paragraph className="text-white">
            You can talk to Satori anytime. Your SMS thread is now your simple
            control center — where you can update your child's settings, change
            notification preferences, and manage daily forecasts just by using
            natural language.
          </Paragraph>
          <div className="flex flex-row justify-center items-center gap-3">
            <Button asChild className="px-5! py-3.5! text-base!">
              <Link href="/">Return to Home Page</Link>
            </Button>
            <Button
              asChild
              className="px-5! py-3.5! text-base!"
              startIcon={<HelpCenterIcon className="text-white!" />}
            >
              <Link href="/help-center">Visit Our Help Center </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupSuccessPage;
