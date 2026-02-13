"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpPolygonIcon } from "@/components/icons";
import { Heading3, Paragraph } from "@/components/common/Typography";

const SubscriptionOfferBannerForSignup = () => {
  return (
    <div className="relative">
      <div className="w-full">
        <ArrowUpPolygonIcon className="ml-[70%] sm:ml-[calc(100%-280px)]" />
      </div>
      <div className="relative bg-primary px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:p-16 rounded-xl sm:rounded-2xl lg:rounded-[20px] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 -mt-0.25">
        <div className="text-center md:text-left">
          <Heading3 className="text-white! text-xl! sm:text-2xl! lg:text-3xl! leading-7! sm:leading-8! lg:leading-10! -tracking-[0.64px]!">
            All this protection for less than $0.66/day.
          </Heading3>
          <Heading3 className="text-white! text-xl! sm:text-2xl! lg:text-3xl! leading-7! sm:leading-8! lg:leading-10! -tracking-[0.64px]!">
            $19.97/month
          </Heading3>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 shrink-0">
          <Paragraph className="text-center text-white! leading-5! text-xs! font-normal!">
            No credit card required.
            <br /> Get immediate protection.
          </Paragraph>
          <Button
            className="px-5! py-3.5! bg-white! text-primary! whitespace-nowrap"
            onClick={() => {
              window.open("/signup/start", "_blank");
            }}
          >
            Start Free 14-Day Trial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOfferBannerForSignup;
