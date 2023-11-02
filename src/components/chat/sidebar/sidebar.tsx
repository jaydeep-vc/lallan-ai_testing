"use client";
import { useContext } from "react";

import useModal from "@/hooks/use-modal";

import LogoutModalContent from "../modals/logout-modal-content";

import UserProfile from "./user-profile";
import RealtimeChannels from "./realtime-channels";
import SidebarHeader from "./header";

import type { Channel } from "@/actions/channels";
import type { Profile } from "@/actions/users";

import { DrawerContext } from "@/context/drawer-context";
export interface SidebarProps {
  profile: Profile;
  serverChannles: Channel[];
}

export default function Sidebar({ profile, serverChannles }: SidebarProps) {
  const { show: showLogoutModal, hide: hideLogoutModal, Modal: LogoutModal } = useModal();
  const { isOpenDrawer, setDrawerOpen } = useContext(DrawerContext);

  return (
    <>
      <LogoutModal>
        <LogoutModalContent onCancel={hideLogoutModal} />
      </LogoutModal>

      <aside
        id="logo-sidebar"
        className={`
                fixed z-40 w-full h-full top-0 md:translate-x-0
                md:relative md:w-1/5 md:h-screen
                transition-transform border-r border-gray-200 
                ${isOpenDrawer ? "translate-x-0" : "-translate-x-full"} 
                focus:outline-none focus:bg-inherit`}
        aria-label="Sidebar"
      >
        <div
          className="absolute -z-10 bg-slate-900/5 h-screen w-full"
          onClick={() => setDrawerOpen(false)}
        ></div>

        <div className="w-[90%] z-20 md:w-full flex flex-col gap-4 p-5 bg-white h-full">
          <SidebarHeader />
          <RealtimeChannels serverChannles={serverChannles} />
          <UserProfile profile={profile} onLogout={showLogoutModal} />
        </div>
      </aside>
    </>
  );
}
