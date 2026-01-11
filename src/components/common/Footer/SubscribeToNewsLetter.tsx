import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Heading4, Paragraph } from "@/components/common/Typography";

interface SubscribeToNewsLetterProps {
  className?: string;
}

const SubscribeToNewsLetter = ({ className }: SubscribeToNewsLetterProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-[20px] bg-transparent border border-solid border-[#585A7D] p-8 flex flex-col gap-2.5",
        className
      )}
    >
      <Heading4 className="text-white! leading-[142%]!">
        Stay Ahead of the Intelligence Curve
      </Heading4>
      <Paragraph className="text-white!">
        Receive insights from the frontier of planetary intelligence,
        causality-first AI, and the architecture of consciousness.
      </Paragraph>

      <div className="flex flex-row gap-4.5 mt-3.5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" type="text" placeholder="John" variant="underline" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" type="text" placeholder="Doe" variant="underline" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="johndoe@gmail.com" variant="underline" />
        </div>
      </div>
    </div>
  );
};
export default SubscribeToNewsLetter;
