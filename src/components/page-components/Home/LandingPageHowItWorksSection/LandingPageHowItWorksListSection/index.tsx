import { cn } from "@/lib/utils";
import { ILandingPageHowItWorksSectionData } from "@/components/page-components/Home/LandingPageHowItWorksSection/data";
import LandingPageHowItWorksListItem from "@/components/page-components/Home/LandingPageHowItWorksSection/LandingPageHowItWorksListSection/LandingPageHowItWorksListItem";

interface ILandingPageHowItWorksListSectionProps {
  data: ILandingPageHowItWorksSectionData[];
  className?: string;
}

const LandingPageHowItWorksListSection = ({
  data,
  className,
}: ILandingPageHowItWorksListSectionProps) => {
  return (
    <div
      className={cn(className, "flex flex-col gap-6 md:gap-8 lg:gap-10 max-w-[900px] mx-auto")}
    >
      {data.map((item) => (
        <LandingPageHowItWorksListItem key={item.title} {...item} />
      ))}
    </div>
  );
};

export default LandingPageHowItWorksListSection;
