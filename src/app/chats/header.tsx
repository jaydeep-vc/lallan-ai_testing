"use client";

import React, { useContext } from "react";

import { DrawerIcon } from "@/components/icons";
import { DrawerContext } from "@/context/drawer-context";

export default function Header() {
  const { setDrawerOpen } = useContext(DrawerContext);

  return (
    <div className="md:hidden sticky px-4 py-4 border-b border-stone-300 flex items-center w-full">
      <div className="flex flex-1 items-center gap-4">
        <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
          <DrawerIcon height={24} width={24} />
        </button>
      </div>
    </div>
  );
}
