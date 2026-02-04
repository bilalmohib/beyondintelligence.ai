import { Button } from "@/components/ui/button";
import { Heading3, Paragraph } from "@/components/common/Typography";

const SubscriptionOfferBannerForSignup = () => {
  return (
    <div className="bg-primary p-16 rounded-[20px] flex flex-row justify-between items-center">
      <div>
        <Heading3 className="text-white! leading-10! -tracking-[0.64px]!">
          All this protection for less than $0.66/day.
        </Heading3>
        <Heading3 className="text-white! leading-10! -tracking-[0.64px]!">
          $19.97/month
        </Heading3>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 px-20">
        <Paragraph className="text-center text-white! leading-5! text-xs! font-normal! ">
          No credit card required.
          <br /> Get immediate protection.
        </Paragraph>
        <Button className="px-5! py-3.5! bg-white! text-primary!">
          Start Free 14-Day Trial
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionOfferBannerForSignup;
