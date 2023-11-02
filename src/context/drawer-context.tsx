"use client";

import { useState, createContext } from "react";

interface DrawerContextProps {
  isOpenDrawer: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export const DrawerContext = createContext<DrawerContextProps>({} as DrawerContextProps);

export const DrawerProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <DrawerContext.Provider value={{ isOpenDrawer: isOpen, setDrawerOpen: setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
