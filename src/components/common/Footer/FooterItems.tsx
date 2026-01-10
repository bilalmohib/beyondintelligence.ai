"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { footerItems } from "@/components/common/Footer/data";
import { Heading4, Heading5, Paragraph } from "@/components/common/Typography";
import { useState, useEffect } from "react";

interface FooterItemsProps {
  className?: string;
}

const FooterItems = ({ className }: FooterItemsProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <TooltipProvider delayDuration={0}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-4">
          {footerItems.map((item, index) => {
            // Check if this is the last item and if it would be alone in its row on mobile
            const isLastItem = index === footerItems.length - 1;
            const isOddNumber = footerItems.length % 2 !== 0;
            const shouldCenterOnMobile = isLastItem && isOddNumber;

            return (
              <div
                className={cn(
                  "flex flex-col gap-3 sm:gap-4 lg:gap-5",
                  shouldCenterOnMobile &&
                    "col-span-2 sm:col-span-1 max-w-[50%] sm:max-w-none mx-auto sm:mx-0"
                )}
                key={index}
              >
                <Heading5 className="leading-7.5 text-white! text-lg! text-center sm:text-left">
                  {item.title}
                </Heading5>

                <div className="flex flex-col gap-2 sm:gap-2.5 lg:gap-2">
                  {item.items.map((item) =>
                    item.isExternal ? (
                      <a
                        href={item.link}
                        key={item.title}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {mounted ? (
                          <Tooltip>
                            <TooltipTrigger className="text-center sm:text-left cursor-pointer w-full">
                              {item.value && <Heading5>{item.title}</Heading5>}
                              <Paragraph className="hover:text-primary text-white! text-base! w-full sm:max-w-[140px] lg:max-w-[180px] truncate transition-colors">
                                {item.isIconOnly ? (
                                  item.value &&
                                  (typeof item.value === "function" ||
                                    typeof item.value === "object") ? (
                                    <item.value />
                                  ) : null
                                ) : typeof item.value === "string" ? (
                                  item.value
                                ) : (
                                  item.title
                                )}
                              </Paragraph>
                            </TooltipTrigger>
                            <TooltipContent>
                              <Paragraph className="text-white! text-base! px-6">
                                {item.title}
                              </Paragraph>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Paragraph className="hover:text-primary text-white! text-base! w-full sm:max-w-[140px] lg:max-w-[180px] truncate transition-colors">
                            {item.title}
                          </Paragraph>
                        )}
                      </a>
                    ) : (
                      <Link href={item.link || ""} key={item.title}>
                        {mounted ? (
                          <Tooltip>
                            <TooltipTrigger className="text-center sm:text-left cursor-pointer w-full">
                              <Paragraph className="hover:text-primary text-white! text-base! w-full sm:max-w-[140px] lg:max-w-[180px] truncate transition-colors">
                                {item.title}
                              </Paragraph>
                            </TooltipTrigger>
                            <TooltipContent>
                              <Paragraph className="text-white text-base! px-6">
                                {item.title}
                              </Paragraph>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Paragraph className="hover:text-primary text-white! text-base! w-full sm:max-w-[140px] lg:max-w-[180px] truncate transition-colors">
                            {item.title}
                          </Paragraph>
                        )}
                      </Link>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
};
export default FooterItems;
