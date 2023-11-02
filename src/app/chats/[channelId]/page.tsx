import type { Metadata } from "next";

import FileSidebar from "./file-listing";
import RealtimeChats from "./realtime-chats";

import channelActions from "@/actions/channels";
import chatActions from "@/actions/chats";
import userActions from "@/actions/users";
import userDocActions from "@/actions/user-docs";

import { fuseTitleText } from "@/lib/toolbar";

type Props = {
  params: { channelId: string };
};

export const revalidate = 0;

export async function generateMetadata({ params: { channelId } }: Props): Promise<Metadata> {
  const [user, channel] = await Promise.all([
    userActions.getCurrentUser(),
    channelActions.fetchById(channelId),
  ]);

  if (user === null || channel == null) {
    return {
      title: "Invalid request",
    };
  }

  return {
    title: fuseTitleText("Lallan.AI", user.user_metadata.first_name, channel.channel_name),
  };
}

export default async function Conversations({ params: { channelId } }: Props) {
  const [channel, conversations, userFiles, user] = await Promise.all([
    channelActions.fetchById(channelId),
    chatActions.fetchAllByChannelId(channelId),
    userDocActions.fetchByChannelId(channelId),
    userActions.getCurrentUser(),
  ]);

  if (channel === null) return;

  return (
    <main className="flex w-full md:w-4/5">
      <RealtimeChats
        user={user!}
        currentChannel={channel!}
        serverChats={conversations?.reverse() ?? []}
        userDocuments={userFiles ?? []}
      />
      <FileSidebar
        serverDocuments={userFiles ?? []}
        channelId={channelId}
        userId={user?.id ?? ""}
        channelTypeId={channel.channel_type_id}
        embeddingModelId={channel.embedding_model_id ?? 1}
      />
    </main>
  );
}
