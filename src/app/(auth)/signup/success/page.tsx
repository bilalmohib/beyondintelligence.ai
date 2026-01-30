"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpCenterIcon } from "@/components/icons";
import Container from "@/components/common/Container";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { Heading1, Paragraph } from "@/components/common/Typography";
import { resetSignupData, selectSignupResponse } from "@/redux/slices/signupSlice";

const SignupSuccessPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signupResponse = useSelector((state: RootState) => selectSignupResponse(state));

  // Clear signup data when user navigates away (cleanup on unmount)
  useEffect(() => {
    return () => {
      // Reset signup data when leaving the success page
      dispatch(resetSignupData());
    };
  }, [dispatch]);

  return (
    <div>
      <div className="bg-image-signup-start rounded-[20px] bg-cover bg-center bg-no-repeat h-102.75 bg-primary">
        <Container className="flex flex-col items-left justify-center h-full">
          <div className="flex flex-col gap-3 h-fit">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-white" />
              <Heading1 className="text-white">
                Thank you!
              </Heading1>
            </div>
            <Heading1 className="text-white">
              Your child's account is almost ready.
            </Heading1>
            <Paragraph className="text-white">
              Satori now has the foundation it needs to protect your child with
              hyperlocal, deeply personalized environmental intelligence.
            </Paragraph>
          </div>
        </Container>
      </div>
      <div className="py-24 px-12.5 flex flex-row justify-center items-center max-w-[900px] mx-auto">
        <div className="bg-background-secondary p-8 rounded-[20px] flex flex-col gap-8">
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
