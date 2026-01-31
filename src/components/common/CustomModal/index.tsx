'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Heading4, Paragraph } from '@/components/common/Typography';
import { closeModal, selectModalContent, selectModalIsOpen } from '@/redux/slices/modalSlice';
import type { AppDispatch, RootState } from '@/redux/store';

interface CustomModalProps {
  /** Optional custom modal body. When provided, renders in the left column instead of Redux content. */
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
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Modal Content */}
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
          <div className="flex h-full w-full flex-col md:flex-row">
            {/* Left column: white background with text content */}
            <div
              className="flex h-full w-full flex-col justify-center bg-white p-8 md:w-[55%] md:p-10 lg:p-12"
              style={{ borderRadius: '20px 0 0 20px' }}
            >
              {children !== undefined ? (
                children
              ) : content ? (
                <>
                  <Heading4 className="mb-5 text-[#1a1a1a]">
                    {content.title}
                  </Heading4>
                  <Paragraph className="mb-8 text-[#4a4a4a]">
                    {content.description}
                  </Paragraph>
                  <p className="font-inter text-base font-bold leading-[142%] text-[#1a1a1a] md:text-lg">
                    {content.bottomText}
                  </p>
                </>
              ) : null}
            </div>

            {/* Right column: image with gradient overlay */}
            {content?.image && (
              <div
                className="relative h-[280px] w-full md:h-full md:w-[45%]"
                style={{ borderRadius: '0 20px 20px 0' }}
              >
                <Image
                  src={content.image}
                  alt=""
                  fill
                  className="object-cover object-center"
                  style={{ borderRadius: '0 20px 20px 0' }}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                {/* Gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 82.41%, rgba(0, 0, 0, 0.6) 100%)',
                    borderRadius: '0 20px 20px 0',
                  }}
                  aria-hidden
                />
              </div>
            )}
          </div>

          {/* Close button */}
          <DialogPrimitive.Close asChild>
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-[#1a1a1a]" />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CustomModal;
