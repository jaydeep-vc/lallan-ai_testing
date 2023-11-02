import { useContext } from "react";

import { toastContext } from "@/context/toast-context";

import ChatOptionsButton from "@/components/conversation/chat-options-button";
import HeaderOptionsButton from "@/components/conversation/header-options-button";

import channelActions, { type Channel } from "@/actions/channels";
import chatActions from "@/actions/chats";
import { type UserDocument } from "@/actions/user-docs";
import Button from "@/components/ui/button";
import { DrawerIcon, MenuIcon } from "@/components/icons";
import { DrawerContext } from "@/context/drawer-context";

interface ChatHeaderProps {
  channel: Channel;
  documents: UserDocument[];
  onChatsRemoved: () => void;
}

export default function ChatHeader({ channel, documents, onChatsRemoved }: ChatHeaderProps) {
  const { setToastAlert } = useContext(toastContext);
  const { setDrawerOpen } = useContext(DrawerContext);

  const handleClearAllChats = async () => {
    try {
      await chatActions.removeAllByChannelId(channel.id);

      // Call this function after all the chats from this channel is removed
      onChatsRemoved();

      // set toast to inform the user that all chats are removed
      setToastAlert({
        title: "Success",
        type: "success",
        message: `All chats from ${channel.channel_name} is removed`,
      });
    } catch (error: any) {
      setToastAlert({ title: "Something went wrong !", type: "error", message: error.message });
    }
  };

  const handleChangeConversationType = async (typeId: number) => {
    try {
      await channelActions.update(channel.id, { conversation_type_id: typeId });
    } catch (error: any) {
      setToastAlert({ title: "Something went wrong !", type: "error", message: error.message });
    }
  };

  return (
    <div className="px-4 py-4 border-b border-stone-300 flex items-center w-full">
      <div className="flex flex-grow items-center gap-4">
        <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
          <DrawerIcon height={24} width={24} />
        </button>
        <div className="w-1 flex-grow">
          <p className="truncate">{channel.channel_name}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-6">
        {/* <ChatOptionsButton
          documents={documents}
          conversationTypeId={channel.conversation_type_id}
          onConversationTypeChanged={handleChangeConversationType}
        /> */}
        <HeaderOptionsButton onClearChatClick={handleClearAllChats} />
      </div>
    </div>
  );
}
