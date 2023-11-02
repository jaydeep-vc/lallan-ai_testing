"use client";

import { useContext } from "react";
import { SidebarContext } from "@/context/sidebar-context";

const LOADING_ITEM_COUNT = 4;

export default function LoadingAside() {
  const { open } = useContext(SidebarContext);

  if (!open) return false;

  return (
    <div
      className="w-3/12 h-screen p-5 transition-transform -translate-x-full bg-white border-l border-gray-200 sm:translate-x-0 flex justify-between flex-col"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white">
        <div className="flex justify-between mb-5 animate-pulse">
          <div className="h-6 w-56 rounded-lg bg-slate-200"></div>
        </div>

        {Array.from({ length: LOADING_ITEM_COUNT }).map((val, index) => (
          <div
            key={`__loading_aside_${JSON.stringify(val)}_${index}}`}
            className="flex items-center gap-3 py-4 rounded-lg animate-pulse"
          >
            <div className="h-6 w-6 rounded-full bg-slate-200 shrink-0"></div>
            <div className="h-4 w-full rounded-lg bg-slate-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
