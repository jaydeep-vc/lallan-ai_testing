"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { ModalContent } from "./ModalContent";

import Container from "./Container";
import Upper from "./Upper";
import Content from "./Content";
import ModalIcon from "./ModalIcon";
import Title from "./Title";
import Message from "./Message";
import Bottom from "./Bottom";
import Button from "./Button";

export interface ModalProps extends React.PropsWithChildren {
  show?: boolean;
  onBackdropClick?: () => void;
}

export default function Modal({ show, onBackdropClick, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (onBackdropClick) onBackdropClick();
      }
    },
    [onBackdropClick]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <>{show && createPortal(<ModalContent ref={ref}>{children}</ModalContent>, document.body)}</>
  );
}

Modal.Container = Container;
Modal.Upper = Upper;
Modal.Content = Content;
Modal.Title = Title;
Modal.Message = Message;
Modal.Icon = ModalIcon;
Modal.Bottom = Bottom;
Modal.Button = Button;
