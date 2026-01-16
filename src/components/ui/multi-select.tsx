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
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  className?: string;
  label?: string;
  labelClassName?: string;
  id?: string;
  disabled?: boolean;
  data: MultiSelectOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  multiSelectClassName?: string;
}

function MultiSelect({
  className,
  label,
  labelClassName,
  id,
  disabled,
  data,
  value: controlledValue,
  onValueChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  multiSelectClassName,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number | undefined>(
    undefined
  );

  const isControlled = controlledValue !== undefined;
  const value = controlledValue ?? internalValue;
  const setValue = React.useCallback(
    (newValue: string[]) => {
      // Always update internal state if not controlled
      if (!isControlled) {
        setInternalValue(newValue);
      }
      // Always call onValueChange if provided
      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    [onValueChange, isControlled]
  );

  const selectedOptions = data.filter((option) => value.includes(option.value));
  const allSelected = data.length > 0 && value.length === data.length;
  const someSelected = value.length > 0 && value.length < data.length;

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const width = triggerRef.current.offsetWidth;
      setPopoverWidth(width);
    }
  }, [open]);

  const handleSelectAll = () => {
    if (allSelected) {
      setValue([]);
    } else {
      setValue(data.map((option) => option.value));
    }
  };

  const handleToggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      setValue(value.filter((v) => v !== optionValue));
    } else {
      setValue([...value, optionValue]);
    }
  };

  const handleRemoveOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(value.filter((v) => v !== optionValue));
  };

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
            disabled={disabled}
            className={cn(
              "w-full justify-between items-center bg-white dark:bg-white hover:bg-white dark:hover:bg-white cursor-pointer [&_.ripple]:bg-black/10! min-h-10 py-2 px-3",
              multiSelectClassName
            )}
          >
            <div className="flex flex-wrap gap-2 flex-1 min-w-0 items-center">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    className="bg-multi-select-selected-item-bg text-white border-0 rounded-[50px] h-[30px] px-[10px] py-[2px] gap-[8px] flex items-center font-inter font-normal text-sm leading-[20px] tracking-normal"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span className="align-middle">{option.label}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleRemoveOption(option.value, e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleRemoveOption(
                            option.value,
                            e as unknown as React.MouseEvent
                          );
                        }
                      }}
                      className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                      aria-label={`Remove ${option.label}`}
                    >
                      <X className="w-3.5 h-3.5 stroke-[2px]" />
                    </span>
                  </Badge>
                ))
              ) : (
                <span className="text-inputPlaceholder dark:text-inputPlaceholder">
                  {placeholder}
                </span>
              )}
            </div>
            <ChevronsUpDown className="text-inputPlaceholder dark:text-inputPlaceholder shrink-0 ml-2" />
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
                <CommandItem
                  value="__select_all__"
                  onSelect={() => handleSelectAll()}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className={cn(
                        "flex items-center justify-center w-4 h-4 rounded-sm shrink-0 transition-colors",
                        allSelected
                          ? "bg-primary border-primary"
                          : someSelected
                          ? "bg-primary border-primary"
                          : "border border-input bg-white"
                      )}
                    >
                      {allSelected ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : someSelected ? (
                        <div className="w-2 h-0.5 bg-white rounded-sm" />
                      ) : null}
                    </div>
                    <span>Select All</span>
                  </div>
                </CommandItem>
                {data.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => handleToggleOption(option.value)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={cn(
                            "flex items-center justify-center w-4 h-4 rounded-sm shrink-0 transition-colors",
                            isSelected
                              ? "bg-primary border-primary"
                              : "border border-input bg-white"
                          )}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span>{option.label}</span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { MultiSelect };
