import { cn } from "@/lib/utils";
import Container from "@/components/common/Container";
import { IFAQs } from "@/components/common/FAQs/types";
import FAQsList from "@/components/common/FAQs/FAQsList";
import FAQsHeader from "@/components/common/FAQs/FAQsHeader";

interface FAQsProps extends IFAQs {
  className?: string;
}

const FAQs = ({ className, faqsList }: FAQsProps) => {
  return (
    <section className={cn("bg-background py-12 md:py-18 lg:py-30", className)}>
      <Container>
        <div className="flex flex-col sm:flex-row justify-between gap-8 md:gap-4 xl:gap-16">
          <div className="w-full sm:w-[45%] md:w-[40%] mllg:w-[35%] mlg:w-[30%] lg:w-[45%] llg:w-[45%] xl:w-[40%]">
            <FAQsHeader />
          </div>
          <div className="w-full sm:w-[55%] md:w-[60%] mllg:w-[65%] mlg:w-[70%] lg:w-[55%] llg:w-[55%] xl:w-[60%] -mt-3.5">
            <FAQsList faqsList={faqsList} />
          </div>
        </div>
      </Container>
    </section>
  );
};
export default FAQs;
