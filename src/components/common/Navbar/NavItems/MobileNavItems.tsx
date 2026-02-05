"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronUp } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  menuItems,
  productCategories,
} from "@/components/common/Navbar/NavItems/data";

interface MobileNavItemsProps {
  onLinkClick: () => void;
}

function MobileNavItems({ onLinkClick }: MobileNavItemsProps) {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(
    "For Organizations"
  );

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleItem = (title: string) => {
    setOpenItem(openItem === title ? null : title);
  };

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <nav aria-label="Mobile navigation" className="w-full">
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isOpen = openItem === item.title;

          return (
            <li key={item.title} className="list-none">
              {item.hasDropdown ? (
                <div className="flex flex-col gap-2">
                  {/* Products trigger */}
                  <button
                    onClick={() => toggleItem(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-5 py-4 text-left transition-all cursor-pointer",
                      isOpen ? "bg-white/5" : "bg-white/5"
                    )}
                  >
                    <span className="text-white font-medium text-base">
                      {item.title}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-white/50 shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-white/50 shrink-0" />
                    )}
                  </button>

                  {/* Expanded: Categories + Products */}
                  {isOpen && (
                    <div className="flex flex-col gap-2 pl-2">
                      {productCategories.map((category) => {
                        const isCatOpen =
                          openCategory === category.title;

                        return (
                          <div key={category.title} className="flex flex-col gap-2">
                            {/* Category trigger */}
                            <button
                              onClick={() => toggleCategory(category.title)}
                              className="flex w-full items-center justify-between rounded-xl bg-white/5 px-5 py-4 text-left transition-all cursor-pointer"
                            >
                              <span
                                className={cn(
                                  "font-medium text-base",
                                  isCatOpen
                                    ? "text-primary"
                                    : "text-white"
                                )}
                              >
                                {category.title}
                              </span>
                              {isCatOpen ? (
                                <ChevronUp className="w-5 h-5 text-white/50 shrink-0" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-white/50 shrink-0" />
                              )}
                            </button>

                            {/* Category products */}
                            {isCatOpen && (
                              <div className="flex flex-col gap-2 pl-2">
                                {category.items.map((product) => (
                                  <Link
                                    key={product.title}
                                    href={product.href}
                                    onClick={onLinkClick}
                                    className={cn(
                                      "flex items-center justify-between rounded-xl bg-white/5 px-5 py-4 transition-colors",
                                      isActive(product.href)
                                        ? "text-primary"
                                        : "text-white hover:bg-white/8"
                                    )}
                                  >
                                    <span className="text-sm leading-5">
                                      {product.title}
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-white/50 shrink-0 ml-3" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onLinkClick}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-xl bg-white/5 px-5 py-4 transition-colors",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-white hover:bg-white/8"
                  )}
                >
                  <span className="font-medium text-base">{item.title}</span>
                  <ChevronRight className="w-5 h-5 text-white/50 shrink-0" />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MobileNavItems;
