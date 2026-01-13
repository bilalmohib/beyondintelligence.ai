import Container from "@/components/common/Container";
import { Heading1, Paragraph } from "@/components/common/Typography";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Container className="flex flex-col items-center justify-center text-center">
        <Heading1 as="h1" className="mb-4 text-white!">
          Under Progress
        </Heading1>
        <Paragraph className="max-w-md text-white!">
          This page is currently under development. Please check back soon.
        </Paragraph>
      </Container>
    </div>
  );
}
export default Home;
