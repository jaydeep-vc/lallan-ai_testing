import { useContext, useState } from "react";

import Button from "@/components/ui/button";
import { GlobalIcon, SelfIcon, ExpertIcon } from "@/components/icons";

import ConversationType from "@/services/conversation-type.service";

import { toastContext } from "@/context/toast-context";

import useOutsideClick from "@/hooks/use-outside-click";

import type { UserDocument } from "@/actions/user-docs";

interface ChatOptionProps {
  conversationTypeId: number;
  documents: UserDocument[];
  onConversationTypeChanged: (value: number) => void;
}

export default function ChatOptions({
  documents,
  conversationTypeId,
  onConversationTypeChanged,
}: ChatOptionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typeId, setTypeId] = useState<number>(conversationTypeId);
  const { setToastAlert } = useContext(toastContext);

  const toggle = () => setIsOpen(!isOpen);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const onChange = (value: number) => {
    toggle();

    if (documents.length === 0 && value !== 2)
      return setToastAlert({
        title: "Invalid Option",
        type: "error",
        message: "Please upload file to enable this functionality.",
      });

    setTypeId(value);
    onConversationTypeChanged(value);
  };

  const renderIcon = (value: number) => {
    switch (value) {
      case 1:
        return <SelfIcon height={20} width={20} />;
      case 2:
        return <GlobalIcon height={20} width={20} />;
      case 3:
        return <ExpertIcon height={20} width={20} />;
      default:
        return null;
    }
  };

  return (
    <div ref={ref}>
      <Button intent="secondary" size="small" onClick={toggle} icon={renderIcon(typeId)!}>
        {ConversationType._getType(typeId)}
      </Button>

      {isOpen && (
        <div className="absolute z-50 top-10 right-12 w-[180px] bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <ul className="py-1.5">
            {ConversationType._values.map(({ type, value }) => (
              <li
                key={value}
                className={`p-2.5 flex transition-colors gap-4 text-sm cursor-pointer ${
                  value === typeId ? "bg-primary-300" : "hover:bg-primary-200"
                }`}
                onClick={() => onChange(value)}
              >
                {renderIcon(value)}
                {type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
