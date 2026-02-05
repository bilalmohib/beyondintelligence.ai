import { cn } from "@/lib/utils";
import { Heading2 } from "@/components/common/Typography";

interface FAQsHeaderProps {
  className?: string;
}

const FAQsHeader = ({ className }: FAQsHeaderProps) => {
  return (
    <div className={cn(className, "flex flex-col justify-start items-start")}>
      <Heading2 className="text-white! leading-normal! lg:leading-13.75! tracking-normal lg:-tracking-[0.92px]!">
        Still Have Questions? <br className="hidden llg:block" /> We’ve Got
        Answers.
      </Heading2>
    </div>
  );
};
export default FAQsHeader;
