import Image from "next/image";
import { cn } from "@/lib/utils";
import { Heading4, Paragraph } from "@/components/common/Typography";
import { ILandingPageHowItWorksSectionData } from "@/components/page-components/Home/LandingPageHowItWorksSection/data";

interface ILandingPageHowItWorksListItemProps
  extends ILandingPageHowItWorksSectionData {
  className?: string;
}

const LandingPageHowItWorksListItem = ({
  title,
  description,
  className,
}: ILandingPageHowItWorksListItemProps) => {
  return (
    <div className={cn(className, "flex flex-row gap-5.5")}>
      <div className="shrink-0 w-12 h-12">
        <Image
          src="/assets/pages/landing/images/LandingPageHowItWorksSection/checkIcon.svg"
          alt="check"
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col gap-3 pt-1.5">
        <Heading4 className="text-white! leading-9! -tracking-[0.56px]!">
          {title}
        </Heading4>
        <Paragraph className="text-white! leading-7!">{description}</Paragraph>
      </div>     
    </div>
  );
};

export default LandingPageHowItWorksListItem;
