"use client";

import { useContext } from "react";

import { SidebarContext } from "@/context/sidebar-context";
import {
  LoadingAside,
  LoadingChatMessage,
  LoadingChatHeader,
  LoadingInput,
} from "@/components/chat/loading";

export default function Loading() {
  const { open } = useContext(SidebarContext);

  return (
    <div className="flex flex-grow w-4/5">
      <div className={`flex flex-col ${open ? "w-9/12" : "w-full"} h-screen`}>
        <LoadingChatHeader />

        <div className="flex flex-col flex-grow overflow-x-auto animate-pulse">
          <div className="flex-grow">
            {Array.from({ length: 4 }).map((val, index) => (
              <LoadingChatMessage key={`__loading_chat_message_${JSON.stringify(val)}_${index}`} />
            ))}
          </div>

          <LoadingInput />
        </div>
      </div>

      <LoadingAside />
    </div>
  );
}
