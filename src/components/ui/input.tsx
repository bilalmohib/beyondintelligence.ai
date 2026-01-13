import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const inputVariants = cva(
  "file:text-foreground selection:bg-primary selection:text-primary-foreground h-10 w-full min-w-0 gap-3 text-base transition-all duration-200 outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm text-input-text",
  {
    variants: {
      variant: {
        default: [
          "placeholder:text-inputPlaceholder",
          "bg-white dark:bg-white",
          "rounded-lg border",
          "py-2 px-3",
          // Default state
          "border-[var(--color-input-border-default)]",
          // Hover state
          "hover:border-[var(--color-input-border-hover)]",
          // Focus state (includes typing)
          "focus:border-[var(--color-input-border-focus)]",
          "focus:shadow-[var(--shadow-input-focus)]",
          "focus-visible:border-[var(--color-input-border-focus)]",
          "focus-visible:shadow-[var(--shadow-input-focus)]",
          "focus-visible:outline-none",
          // Active state
          "active:border-[var(--color-input-border-active)]",
          "active:backdrop-blur-[8px]",
          // Disabled state
          "disabled:border-[var(--color-input-border-disabled)]",
          "disabled:opacity-100",
          // Error state (aria-invalid)
          "aria-invalid:border-[var(--color-input-border-error)]",
          "aria-invalid:shadow-[var(--shadow-input-error)]",
          "aria-invalid:focus:border-[var(--color-input-border-error)]",
          "aria-invalid:focus:shadow-[var(--shadow-input-error)]",
        ].join(" "),
        underline:
          "placeholder:text-[var(--color-inputPlaceholder)] bg-transparent border-0 border-b border-[var(--color-inputUnderline)] rounded-none shadow-none focus-visible:border-[var(--color-inputUnderline)] focus-visible:ring-0 focus-visible:border-b-2 focus-visible:outline-none aria-invalid:border-destructive aria-invalid:border-b",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputProps extends React.ComponentProps<"input"> {
  variant?: VariantProps<typeof inputVariants>["variant"];
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  id?: string;
}

function Input({
  className,
  type,
  variant,
  label,
  labelClassName,
  inputClassName,
  id,
  disabled,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            disabled && "dark:text-white! text-input-label-disabled!",
            labelClassName
          )}
        >
          {label}
        </Label>
      )}
      <input
        id={id}
        type={type}
        data-slot="input"
        disabled={disabled}
        className={cn(inputVariants({ variant }), inputClassName)}
        {...props}
      />
    </div>
  );
}

export { Input, inputVariants };
