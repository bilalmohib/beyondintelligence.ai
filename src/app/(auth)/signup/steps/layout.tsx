import Container from "@/components/common/Container";
import { Heading2, Heading4 } from "@/components/common/Typography";

const SignupStepsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-8 py-8">
          <Heading4 className="text-white">
            Create your child’s Satori account
          </Heading4>
          <div className="bg-background-secondary p-24 rounded-[20px] flex flex-col gap-24">
            {/* <SignupStepper /> */}

            <div className="flex flex-col gap-10">
              <Heading2 className="text-white">Parent Information</Heading2>

              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignupStepsLayout;
