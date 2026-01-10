"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ListItem from "@/components/common/Navbar/NavItems/ListItem";
import { menuItems } from "@/components/common/Navbar/NavItems/data";

const NavItems = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="gap-2 xl:gap-6 xl:flex-row flex-col">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.hasDropdown ? (
              <>
                <NavigationMenuTrigger className="font-inter text-base font-normal leading-none tracking-[0.09em] text-white! bg-background hover:bg-background! hover:text-primary! data-[state=open]:bg-background data-[state=open]:text-primary data-[state=open]:hover:bg-background!">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-[400px]! bg-background! rounded-lg">
                  <ul className="grid gap-2">
                    {item.items?.map((subItem) => (
                      <ListItem
                        key={subItem.title}
                        title={subItem.title}
                        href={subItem.href}
                        Icon={subItem.icon}
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
                className={`${navigationMenuTriggerStyle()} bg-background hover:bg-transparent hover:text-primary`}
              >
                <Link
                  href={item.href}
                  className="font-inter! text-base! font-normal leading-none tracking-[0.09em] text-white! hover:text-primary! transition-colors! duration-200"
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
