"use client";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { Heading5, Paragraph } from "@/components/common/Typography";
import { IFAQsItem } from "@/components/common/FAQs/types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface FAQsListProps {
  className?: string;
  faqsList: IFAQsItem[];
}

const FAQsList = ({ className, faqsList }: FAQsListProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-full flex flex-col gap-0", className)}>
        <div className="w-full">
          {faqsList.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[#4B4B4B33] border-solid py-[17px]"
            >
              <Heading5 className="text-white! leading-8! -tracking-[0.48px]!">
                {faq.question}
              </Heading5>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full flex flex-col gap-0", className)}>
      <Accordion type="single" collapsible className="w-full">
        {faqsList.map((faq, index) => {
          return (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border-b border-[#4B4B4B33] border-solid"
            >
              <AccordionTrigger className="group flex items-center justify-between py-[17px] hover:no-underline [&>svg]:hidden">
                <Heading5 className="text-white! leading-8! -tracking-[0.48px]!">
                  {faq.question}
                </Heading5>
                <span className="flex shrink-0 items-center text-white group-data-[state=open]:hidden">
                  <ChevronDownIcon className="w-5! h-5!" color="white" />
                </span>
                <span className="hidden shrink-0 items-center text-white group-data-[state=open]:inline-flex">
                  <ChevronUpIcon className="w-5! h-5!" color="white" />
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Paragraph
                  className="text-base! leading-6! text-white!"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FAQsList;
