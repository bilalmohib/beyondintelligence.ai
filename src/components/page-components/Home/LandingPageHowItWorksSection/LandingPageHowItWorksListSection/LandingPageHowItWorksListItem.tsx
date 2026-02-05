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
    <div className={cn(className, "flex flex-row gap-4 mlg:gap-5.5")}>
      <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 mlg:w-12 mlg:h-12">
        <Image
          src="/assets/pages/landing/images/LandingPageHowItWorksSection/checkIcon.svg"
          alt="check"
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col gap-2 mlg:gap-3 pt-0 md:pt-0.5 mlg:pt-1.5">
        <Heading4 className="text-white! leading-normal! mlg:leading-9! font-semibold! md:font-bold! -tracking-[0.56px]! text-lg! md:text-xl! mlg:text-2xl! lg:text-[28px]!">
          {title}
        </Heading4>
        <Paragraph className="text-white! leading-normal! mlg:leading-7!">{description}</Paragraph>
      </div>
    </div>
  );
};

export default LandingPageHowItWorksListItem;
