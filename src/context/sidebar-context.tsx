"use client";

import { useState, createContext } from "react";

interface SidebarContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextProps>({} as SidebarContextProps);

export const SidebarProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <SidebarContext.Provider value={{ open: isOpen, setOpen }}>{children}</SidebarContext.Provider>
  );
};
