import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { CloseIcon, PlusIcon } from "@/components/icons";

import CreateChannelModalContent from "../modals/create-channel-modal-content";

import Button from "@/components/ui/button";
import useModal from "@/hooks/use-modal";
import { useContext } from "react";
import { DrawerContext } from "@/context/drawer-context";
export interface CreateChannelProps {
  onCancel: () => void;
}
export default function SidebarHeader() {
  const {
    show: showCreateChannelModel,
    hide: hideCreateChannelModel,
    Modal: CreateChannelModel,
  } = useModal();
  const { setDrawerOpen } = useContext(DrawerContext);
  const router = useRouter();

  return (
    <>
      <CreateChannelModel>
        <CreateChannelModalContent
          onCancel={hideCreateChannelModel}
          onSave={() => {
            hideCreateChannelModel();
          }}
        />
      </CreateChannelModel>
      <div className="">
        <div className="h-fulloverflow-y-auto bg-white flex justify-between items-center">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setDrawerOpen(false);
              router.push("/");
            }}
            className="flex md:justify-center md:items-center w-full focus:outline-1 focus:outline-primary-400 rounded-lg py-3"
          >
            <div className="w-10 h-10 md:h-20 md:w-20 mr-2 md:mr-4 shrink-0 relative">
              <Image
                src="/svg/logo.svg"
                alt="Brand Logo"
                priority={true}
                quality={100}
                sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
                fill
              />
            </div>
            <span className="self-center truncate text-xl font-semibold sm:text-2xl whitespace-nowrap">
              Lallan.ai
            </span>
          </Link>

          <Button
            size="small"
            diverse="text"
            className="md:hidden"
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon height={24} width={24} />
          </Button>
        </div>

        <Button
          diverse="outline"
          className="w-full mt-2"
          icon={<PlusIcon height={16} width={16} color="primary" />}
          onClick={showCreateChannelModel}
        >
          New Channel
        </Button>
      </div>
    </>
  );
}
