import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading2, Heading4 } from "@/components/common/Typography";
import SignupStepper from "@/app/(auth)/signup/steps/(components)/SignupStepper";
import { signupSteps } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";

const SignupStepsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-8 py-8">
          <Heading4 className="text-white">
            Create your child’s Satori account
          </Heading4>
          <div className="bg-background-secondary p-24 rounded-[20px] flex flex-col gap-24">
            <SignupStepper steps={signupSteps} />

            <div className="flex flex-col gap-10">
              <Heading2 className="text-white">Parent Information</Heading2>

              {children}

              <div className="flex justify-end">
                <Button variant="default" size="lg" className="w-fit px-5">
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignupStepsLayout;
