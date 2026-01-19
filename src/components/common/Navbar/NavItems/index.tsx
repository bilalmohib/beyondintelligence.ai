"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ListItem from "@/components/common/Navbar/NavItems/ListItem";
import { menuItems } from "@/components/common/Navbar/NavItems/data";

interface NavItemsProps {
  isNavTransparent?: boolean;
}

const NavItems = ({ isNavTransparent }: NavItemsProps) => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="gap-2 xl:gap-6 xl:flex-row flex-col">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.hasDropdown ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    "font-inter text-base font-normal leading-none tracking-[0.09em] text-white!",
                    isNavTransparent
                      ? "bg-transparent hover:bg-transparent! hover:text-white! data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent! data-[state=open]:text-white"
                      : "bg-background hover:bg-background! hover:text-primary! data-[state=open]:bg-background data-[state=open]:hover:bg-background! data-[state=open]:text-primary"
                  )}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={cn(
                    "w-[400px]! rounded-lg border shadow-lg z-50 transition-all duration-200",
                    "bg-[#1F2937]! border-[#374151]!",
                    "data-[state=closed]:bg-transparent! data-[state=closed]:border-transparent! data-[state=closed]:shadow-none!"
                  )}
                >
                  <ul className="grid gap-2">
                    {item.items?.map((subItem) => (
                      <ListItem
                        key={subItem.title}
                        title={subItem.title}
                        href={subItem.href}
                        Icon={subItem.icon}
                        isNavTransparent={isNavTransparent}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isNavTransparent
                    ? "bg-transparent! hover:bg-transparent! hover:text-white!"
                    : "bg-background hover:bg-transparent hover:text-primary"
                )}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "font-inter! text-base! font-normal leading-none tracking-[0.09em] text-white! transition-colors! duration-200",
                    isNavTransparent
                      ? "hover:text-white!"
                      : "hover:text-primary!"
                  )}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default NavItems;
