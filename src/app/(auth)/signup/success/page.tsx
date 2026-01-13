import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading1, Paragraph } from "@/components/common/Typography";
import { HelpCircleIcon } from "lucide-react";
import { HelpCenterIcon } from "@/components/icons";

const SignupSuccessPage = () => {
  return (
    <div>
      <div className="bg-image-signup-start rounded-[20px] bg-cover bg-center bg-no-repeat h-102.75 bg-primary">
        <Container className="flex flex-col items-left justify-center h-full">
          <div className="flex flex-col gap-3 h-fit">
            <Heading1 className="text-white">
              Thank you!
              <br />
              Your child’s account is almost ready.
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
          <Paragraph className="text-white">
            Please check your SMS for a special link — your child’s
            Environmental Safety Map — a powerful visualization of the
            neighborhood-level patterns Satori will monitor 24/7 to keep your
            child safer.
          </Paragraph>
          <Paragraph className="text-white">
            You can talk to Satori anytime. Your SMS thread is now your simple
            control center — where you can update your child’s settings, change
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
              <Link href="/help-center">Visit Our Help Center </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupSuccessPage;
