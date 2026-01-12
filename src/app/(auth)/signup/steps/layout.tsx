import Container from "@/components/common/Container";
import { Heading4 } from "@/components/common/Typography";

const SignupStepsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-4">
          <Heading4 className="text-white">
            Create your child’s Satori account
          </Heading4>
        </div>
        {children}
      </Container>
    </div>
  );
};

export default SignupStepsLayout;
