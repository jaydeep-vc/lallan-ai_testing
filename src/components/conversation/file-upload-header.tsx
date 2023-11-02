import React, { useContext } from "react";

import { SidebarContext } from "@/context/sidebar-context";

import { CloseIcon } from "@/components/icons";

export default function FileUploadHeader({ numOfDocs }: { numOfDocs: number }) {
  const { open, setOpen } = useContext(SidebarContext);

  return (
    <div className="flex justify-between mb-5">
      <p className="text-primary font-bold text-base">Your Documents ({numOfDocs})</p>
      <CloseIcon width={25} height={25} className="cursor-pointer" onClick={() => setOpen(!open)} />
    </div>
  );
}
