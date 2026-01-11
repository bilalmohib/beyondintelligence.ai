"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { footerItems } from "@/components/common/Footer/data";
import { Heading5, Paragraph } from "@/components/common/Typography";
import SubscribeToNewsLetter from "@/components/common/Footer/SubscribeToNewsLetter";

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
                    "col-span-2 sm:col-span-1 mx-auto sm:mx-0"
                )}
                key={index}
              >
                <Heading5 className="leading-7.5 text-white! text-lg! text-center sm:text-left">
                  {item.title}
                </Heading5>

                <div
                  className={cn(
                    "flex flex-col",
                    item.title === "Contact Us"
                      ? "gap-4"
                      : "gap-2 sm:gap-2.5 lg:gap-3"
                  )}
                >
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
                            <TooltipTrigger className="text-center sm:text-left cursor-pointer flex flex-col gap-1.5 w-full">
                              {item.value && (
                                <Heading5 className="text-lg! text-white! leading-7!">
                                  {item.title}
                                </Heading5>
                              )}
                              <Paragraph className="hover:text-primary! text-white! text-base! truncate transition-colors w-full sm:max-w-[240px] lg:max-w-[340px]">
                                {item.isIconOnly ? (
                                  item.value &&
                                  (typeof item.value === "function" ||
                                    typeof item.value === "object") ? (
                                    <item.value size={22} className="mt-1.5" />
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
                          <Paragraph className="hover:text-primary! text-white! text-base! w-full sm:max-w-[240px] lg:max-w-[340px] truncate transition-colors">
                            {item.title}
                          </Paragraph>
                        )}
                      </a>
                    ) : (
                      <Link href={item.link || ""} key={item.title}>
                        {mounted ? (
                          <Tooltip>
                            <TooltipTrigger className="text-center sm:text-left cursor-pointer w-full flex flex-col gap-1.5">
                              {item.value && (
                                <Heading5 className="text-lg! text-white! leading-7!">
                                  {item.title}
                                </Heading5>
                              )}
                              <Paragraph className="hover:text-primary! text-white! text-base! w-full sm:max-w-[240px] lg:max-w-[340px] truncate transition-colors">
                                {item.isIconOnly ? (
                                  item.value &&
                                  (typeof item.value === "function" ||
                                    typeof item.value === "object") ? (
                                    <item.value size={22} className="mt-1.5" />
                                  ) : null
                                ) : typeof item.value === "string" ? (
                                  item.value
                                ) : (
                                  item.title
                                )}
                              </Paragraph>
                            </TooltipTrigger>
                            <TooltipContent>
                              <Paragraph className="text-white text-base! px-6">
                                {item.title}
                              </Paragraph>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Paragraph className="hover:text-primary text-white! text-base! w-full sm:max-w-[240px] lg:max-w-[340px] truncate transition-colors">
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

          <SubscribeToNewsLetter className="col-span-3 mx-auto sm:mx-0" />
        </div>
      </TooltipProvider>
    </div>
  );
};
export default FooterItems;
