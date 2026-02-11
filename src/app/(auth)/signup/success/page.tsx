"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCenterIcon } from "@/components/icons";
import Container from "@/components/common/Container";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { useSignupCompletion } from "@/hooks/useSignupCompletion";
import { Heading1, Paragraph } from "@/components/common/Typography";
import {
  resetSignupData,
  selectSignupResponse,
} from "@/redux/slices/signupSlice";

const SignupSuccessPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signupResponse = useSelector((state: RootState) =>
    selectSignupResponse(state)
  );
  const { isSignupComplete, completionData } = useSignupCompletion();

  // TODO: Remove this once we have a way to check if the user has already completed the signup process
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isReturnVisit = isSignupComplete && !signupResponse;

  useEffect(() => {
    return () => {
      dispatch(resetSignupData());
    };
  }, [dispatch]);

  const completionDate = completionData.timestamp
    ? new Date(completionData.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="p-2.5">
      <div className="bg-image-signup-start rounded-lg md:rounded-[20px] bg-cover bg-center bg-no-repeat h-96 md:h-111.5 bg-primary">
        <Container className="flex flex-col items-left justify-end pb-23 h-full">
          <div className="flex flex-col gap-2 md:gap-4 h-fit">
            <div>
              <Heading1 className="text-white">Thank you!</Heading1>
              <Heading1 className="text-white">
                Your child's account is almost ready.
              </Heading1>
            </div>
            <Paragraph className="text-white leading-7!">
              Satori now has the foundation it needs to protect your child with
              hyperlocal, deeply personalized environmental intelligence.
            </Paragraph>
          </div>
        </Container>
      </div>
      <div className="py-16 md:py-24 px-8 md:px-12.5 flex flex-row justify-center items-center max-w-[900px] mx-auto">
        <div className="bg-background-secondary p-6 md:p-8 rounded-lg md:rounded-[20px] flex flex-col gap-6 md:gap-8">
          {/* {signupResponse && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <Paragraph className="text-white text-sm!">
                <span className="font-semibold">Account Status:</span>{" "}
                <span className="capitalize">{signupResponse.status}</span>
              </Paragraph>
              <Paragraph className="text-white text-sm! mt-1">
                <span className="font-semibold">Next Step:</span>{" "}
                <span className="capitalize">
                  {signupResponse.next_step?.replace(/_/g, " ")}
                </span>
              </Paragraph>
            </div>
          )} */}

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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              asChild
              className="w-full sm:w-fit px-5! py-3.5! text-base!"
            >
              <Link href="/">Return to Home Page</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-fit px-5! py-3.5! text-base!"
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
