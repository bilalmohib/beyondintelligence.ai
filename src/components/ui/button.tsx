"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { useRipple } from "@/hooks/useRipple";
import { useGetSiteInfoQuery } from "@/redux/apiSlice";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm lg:text-lg font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-xs hover:bg-buttonHover",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11.5 px-3.5 py-2 has-[>svg]:px-3 rounded-lg",
        sm: "h-9.5 rounded-lg gap-1.5 px-3.5 has-[>svg]:px-2.5",
        lg: "h-13.5 rounded-lg px-3.5 has-[>svg]:px-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isRedirectToSignup?: boolean;
    isRedirectToLogin?: boolean;
    isRedirectToDemo?: boolean;
    isRedirectToContact?: boolean;
  }) {
  const createRipple = useRipple();
  const Comp = asChild ? Slot : "button";

  const { data: siteInfo, isLoading, error } = useGetSiteInfoQuery();

  const signupUrl = siteInfo?.site_url
    ? `${siteInfo.site_url}signup`
    : undefined;

  const loginUrl = siteInfo?.site_url ? `${siteInfo.site_url}login` : undefined;

  const demoUrl = siteInfo?.demo_link || undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);

    onClick?.(event);
  };

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative overflow-hidden cursor-pointer"
      )}
      {...props}
      {...(asChild ? {} : { onClick: handleClick })}
    />
  );
}

export { Button, buttonVariants };
