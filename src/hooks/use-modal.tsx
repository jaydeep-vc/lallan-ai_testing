"use client";

import React, { useState } from "react";

import ModalContaier from "@/components/ui/modal";

export default function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const show = () => setIsOpen(true);

  const hide = () => setIsOpen(false);

  const Modal = ({ children }: React.PropsWithChildren) => (
    <ModalContaier
      show={isOpen}
      onBackdropClick={() => {
        setIsOpen(false);
      }}
    >
      {children}
    </ModalContaier>
  );

  return { show, hide, Modal };
}
