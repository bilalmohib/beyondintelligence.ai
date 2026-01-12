import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading1, Paragraph } from "@/components/common/Typography";

const SignupStartPage = () => {
  return (
    <div>
      <div className="bg-image-signup-start rounded-[20px] bg-cover bg-center bg-no-repeat h-102.75 bg-primary">
        <Container className="flex flex-col items-left justify-center h-full">
          <div className="flex flex-col gap-3 h-fit">
            <Heading1 className="text-white">
              Create your child’s Satori account
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
            learn your child’s unique breathing patterns and daily environment.
            The more precisely we understand your home, school, and routines,
            the more Satori can transform complex environmental signals into
            hyperlocal, deeply personalized guidance tuned to your child’s
            neighborhood and lifestyle.
          </Paragraph>
          <Paragraph className="text-white">
            Please take your time — every detail you share helps Satori protect
            your child more intelligently. Most parents complete this in under 5
            minutes.
          </Paragraph>
          <div className="flex justify-end">
            <Button asChild>
              <Link href="/signup/steps/parent-information">Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupStartPage;
