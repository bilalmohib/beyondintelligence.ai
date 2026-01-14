"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  className?: string;
  label?: string;
  labelClassName?: string;
  id?: string;
  disabled?: boolean;
  data: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  comboBoxClassName?: string;
}

function Combobox({
  className,
  label,
  labelClassName,
  id,
  disabled,
  data,
  value: controlledValue,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  comboBoxClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number | undefined>(
    undefined
  );

  const value = controlledValue ?? internalValue;
  const setValue = React.useCallback(
    (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    },
    [onValueChange]
  );

  const selectedOption = data.find((option) => option.value === value);

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const width = triggerRef.current.offsetWidth;
      setPopoverWidth(width);
    }
  }, [open]);

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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between bg-white dark:bg-white hover:bg-white dark:hover:bg-white cursor-pointer [&_.ripple]:bg-black/10!",
              comboBoxClassName
            )}
          >
            {selectedOption ? (
              <span className="text-input-text dark:text-input-text">
                {selectedOption.label}
              </span>
            ) : (
              <span className="text-inputPlaceholder dark:text-inputPlaceholder">
                {placeholder}
              </span>
            )}
            <ChevronsUpDown className="text-inputPlaceholder dark:text-inputPlaceholder" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 bg-white dark:bg-white"
          style={{ width: popoverWidth ? `${popoverWidth}px` : undefined }}
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {data.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
export { Combobox };
