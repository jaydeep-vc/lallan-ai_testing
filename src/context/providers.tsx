"use client";

import { DrawerProvider } from "./drawer-context";
import { SidebarProvider } from "./sidebar-context";
import { ToastContextProvider } from "./toast-context";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      <ToastContextProvider>
        <DrawerProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </DrawerProvider>
      </ToastContextProvider>
    </>
  );
}
