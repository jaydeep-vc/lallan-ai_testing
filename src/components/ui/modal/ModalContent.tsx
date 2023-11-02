"use client";

import { ForwardedRef, forwardRef } from "react";

function ModalContentInner(
  { children }: React.PropsWithChildren,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      data-open="anim-opacity"
      className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        ref={ref}
        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 w-[95%] md:max-w-2xl"
      >
        {children}
      </div>
    </div>
  );
}

export const ModalContent = forwardRef(ModalContentInner);
