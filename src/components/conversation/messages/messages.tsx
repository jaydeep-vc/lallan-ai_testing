import ChatMessage from "./chat-message";

import type { Conversation } from "@/actions/chats";
import type { User } from "@/actions/users";

interface Chat extends Conversation {
  isGenerateing?: boolean;
}

export default function Messages({
  chats,
  user,
  channelId,
}: {
  chats: Chat[];
  user: User;
  channelId: string;
}) {
  return chats.map((chat, index) => (
    <ChatMessage
      key={chat.id}
      loading={chat.isGenerateing}
      user={user}
      channelId={channelId}
      answer={chat.answer}
      metadata={chat.metadata ?? ""}
      question={chat.question}
    />
  ));
}
