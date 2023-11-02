import { useContext, useState } from "react";

import { SidebarContext } from "@/context/sidebar-context";

import { DeleteIcon, MenuIcon } from "@/components/icons";
import Button from "@/components/ui/button";

import useOutsideClick from "@/hooks/use-outside-click";
import useModal from "@/hooks/use-modal";

interface HeaderOptionProps {
  onClearChatClick: () => void;
}

export default function HeaderOptionsButton({ onClearChatClick }: HeaderOptionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { open, setOpen } = useContext(SidebarContext);
  const { Modal: ClearChatModal, show: showClearChatModal, hide: hideClearChatModal } = useModal();

  const optionsEleRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const handleFileSidebar = () => {
    setOpen(!open);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ClearChatModal>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <DeleteIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h1 className="text-2xl">Clear Chats</h1>

              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to remove all chats? All of your data will be permanently
                  removed. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={() => {
              hideClearChatModal();
              onClearChatClick();
            }}
          >
            Yes, Remove All
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={hideClearChatModal}
          >
            Cancel
          </button>
        </div>
      </ClearChatModal>

      <div ref={optionsEleRef}>
        <Button
          intent="secondary"
          size="small"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-transperent rounded-md focus:outline-none"
        >
          <MenuIcon width={25} height={25} />
        </Button>

        {isOpen && (
          <div
            className={`
          absolute z-50 top-12 w-[180px] bg-white border border-gray-300 
          shadow-sm rounded-md overflow-hidden ${open ? "right-[21%]" : "right-4"}
          `}
          >
            <p className="text-sm px-3 py-3 text-primary font-semibold">Options</p>
            <ul className="text-sm">
              <li className="p-2.5 hover:bg-primary-200 cursor-pointer" onClick={handleFileSidebar}>
                {open ? "Close File" : "Goto Files"}
              </li>
              <li
                className="p-2.5 hover:bg-primary-200 cursor-pointer"
                onClick={() => {
                  setIsOpen(!isOpen);
                  showClearChatModal();
                }}
              >
                Clear Chats
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
