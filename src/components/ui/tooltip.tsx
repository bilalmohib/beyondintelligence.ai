"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Internal context – lets TooltipContent close the tooltip without   */
/*  the consumer needing any useState at all.                          */
/* ------------------------------------------------------------------ */
const TooltipCloseCtx = React.createContext<(() => void) | null>(null)

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const [internalOpen, setInternalOpen] = React.useState(false)

  // If the consumer passes `open` we respect it (controlled mode).
  // Otherwise we manage state ourselves (uncontrolled mode).
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const onOpenChange = isControlled ? controlledOnOpenChange : setInternalOpen

  const close = React.useCallback(() => {
    if (isControlled) {
      controlledOnOpenChange?.(false)
    } else {
      setInternalOpen(false)
    }
  }, [isControlled, controlledOnOpenChange])

  return (
    <TooltipProvider>
      <TooltipCloseCtx.Provider value={close}>
        <TooltipPrimitive.Root
          data-slot="tooltip"
          open={open}
          onOpenChange={onOpenChange}
          {...props}
        />
      </TooltipCloseCtx.Provider>
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  maxWidth?: number
  /** Optional title shown in primary colour at the top of the tooltip */
  title?: string
  /** When true, render a close (X) button that closes the tooltip */
  showClose?: boolean
  /** @deprecated No longer needed – close is handled automatically via context */
  onClose?: () => void
}

function TooltipContent({
  className,
  sideOffset = 0,
  maxWidth = 400,
  title,
  showClose,
  onClose,
  children,
  ...props
}: TooltipContentProps) {
  const isCardStyle = !!title || !!showClose
  const closeFromCtx = React.useContext(TooltipCloseCtx)
  const handleClose = onClose ?? closeFromCtx ?? undefined

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-tooltip-content-transform-origin)",
          isCardStyle
            ? "bg-white text-gray-800 rounded-2xl px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
            : "bg-foreground text-background rounded-md px-3 py-1.5 text-xs",
          className
        )}
        style={{ maxWidth: `${maxWidth}px` }}
        {...props}
      >
        {isCardStyle ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              {title && (
                <span className="text-primary font-semibold text-base leading-6">
                  {title}
                </span>
              )}
              {showClose && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="shrink-0 mt-0.5 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                  aria-label="Close tooltip"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              )}
            </div>
            <div className="text-sm leading-6 text-gray-700">{children}</div>
          </div>
        ) : (
          children
        )}
        <TooltipPrimitive.Arrow
          className={cn(
            "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]",
            isCardStyle
              ? "bg-white fill-white"
              : "bg-foreground fill-foreground"
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
