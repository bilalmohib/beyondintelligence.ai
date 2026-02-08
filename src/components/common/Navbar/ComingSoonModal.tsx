"use client";

import { Rocket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ComingSoonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle?: string;
}

const ComingSoonModal = ({
  open,
  onOpenChange,
  productTitle,
}: ComingSoonModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-md border-white/10 bg-[#0d0d23] p-0 gap-0 overflow-hidden rounded-[20px] text-white shadow-2xl sm:max-w-md [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:right-4 [&>button]:top-4"
      >
        <DialogHeader className="p-8 pb-4 text-left">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30">
              <Rocket className="h-7 w-7 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-white text-center!">
            Coming Soon
          </DialogTitle>
          <DialogDescription className="text-white/80 text-center text-sm leading-5 mt-2">
            {productTitle ? (
              <>
                <span className="font-medium text-white">{productTitle}</span>
                <br />
                is currently in development. We&apos;re building something
                valuable for organizations — stay tuned.
              </>
            ) : (
              <>
                This product is currently in development. We&apos;re building
                something valuable for organizations — stay tuned.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="px-8 pb-8 pt-2 flex flex-col gap-4">
          <p className="text-white/60 text-xs text-center">
            Get in touch to learn more or join the waitlist.
          </p>
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-medium py-3"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonModal;
