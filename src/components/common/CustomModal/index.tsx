'use client';

import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { closeModal, selectModalContent, selectModalIsOpen } from '@/redux/slices/modalSlice';
import type { AppDispatch, RootState } from '@/redux/store';

interface CustomModalProps {
  children?: React.ReactNode;
}

const CustomModal = ({ children }: CustomModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => selectModalIsOpen(state));
  const content = useSelector((state: RootState) => selectModalContent(state));

  const handleOpenChange = (open: boolean) => {
    if (!open) dispatch(closeModal());
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          className="fixed inset-0 z-50 overflow-hidden outline-none rounded-[20px] md:inset-auto md:top-[70px] md:left-[30px] md:right-[30px] md:bottom-[69px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
          <VisuallyHidden.Root asChild>
            <DialogPrimitive.Title>
              {content?.title || 'Modal'}
            </DialogPrimitive.Title>
          </VisuallyHidden.Root>

          <div className="flex h-full w-full flex-col md:flex-row">
            {children}
          </div>

          <DialogPrimitive.Close asChild>
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#1A1C4E] bg-white/95 text-[#1A1C4E] shadow-md transition-opacity hover:opacity-90 md:right-4 md:top-4 md:border-white md:bg-transparent md:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 shrink-0" />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CustomModal;
