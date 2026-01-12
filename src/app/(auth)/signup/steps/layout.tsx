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
              <Heading2 className="text-white leading-0!">
                Parent Information
              </Heading2>

              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignupStepsLayout;
