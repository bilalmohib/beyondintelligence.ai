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
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          className="fixed z-50 overflow-hidden outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{
            top: '70px',
            left: '30px',
            right: '30px',
            bottom: '69px',
            borderRadius: '20px',
          }}
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
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-transparent shadow-md transition-opacity hover:opacity-90 border border-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CustomModal;
