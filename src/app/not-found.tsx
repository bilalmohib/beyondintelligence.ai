import Link from "next/link";
import Container from "@/components/common/Container";
import { Heading1, Paragraph } from "@/components/common/Typography";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Container className="flex flex-col items-center justify-center text-center">
        <Heading1
          as="h1"
          className="mb-4 text-6xl md:text-8xl lg:text-9xl text-white!"
        >
          404
        </Heading1>
        <Heading1
          as="h2"
          className="mb-4 text-2xl md:text-3xl lg:text-4xl text-white!"
        >
          Page not found
        </Heading1>
        <Paragraph className="mb-8 max-w-md text-white!">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Paragraph>
        <Button asChild variant="default" size="default">
          <Link href="/">Go to homepage</Link>
        </Button>
      </Container>
    </div>
  );
}
export default NotFound;
