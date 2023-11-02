"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Message } from "ai";

import chatService from "@/services/chat.service";
import ConversationType from "@/services/conversation-type.service";

import { SidebarContext } from "@/context/sidebar-context";

import useElementScroll from "@/hooks/use-element-scroll";

import ChatInput from "@/components/conversation/chat-input";
import ChatMessage from "@/components/conversation/messages/chat-message";
import Messages from "@/components/conversation/messages";
import Switch, { Case, Default } from "@/components/utils/switch";

import ChatHeader from "./chat-header";

import channelActions, { type Channel } from "@/actions/channels";
import chatActions, { type Conversation } from "@/actions/chats";
import { unSubscribeChannels } from "@/actions/un-subscribe";
import type { User } from "@/actions/users";
import type { UserDocument } from "@/actions/user-docs";
import EmbeddingModel from "@/services/EmbeddingModel";
import LanguageModel from "@/services/LanguageModel";
import { RepeatIcon } from "@/components/icons";

interface Chat extends Conversation {
  isGenerateing?: boolean;
}

interface RealtimeChatsProps {
  userDocuments: UserDocument[];
  currentChannel: Channel;
  serverChats: Conversation[];
  user: User;
}

const PAGE_LIMIT = 5;

export default function RealtimeChats({
  userDocuments,
  currentChannel,
  serverChats,
  user,
}: RealtimeChatsProps) {
  const { open } = useContext(SidebarContext);

  const [chats, setChats] = useState<Chat[]>(serverChats);
  const [channel, setChannel] = useState<Channel>(currentChannel);
  const [isResponseGenerating, setIsResponseGenerating] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [lastChat, setLastChat] = useState<Chat | null>(null);

  const fetchMoreChats = async () => {
    setIsFetching(true);
    try {
      const offset = (currentPage - 1) * PAGE_LIMIT;
      const data = await chatActions.fetchAllByChannelId(
        channel.id,
        offset,
        offset + PAGE_LIMIT - 1
      );
      // reverse data
      const fetchedItems = data?.reverse() as Chat[];
      fetchedItems.push(...chats);
      // push updated data to the state
      setChats(fetchedItems);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const router = useRouter();

  const { ref, scrollToBottom, restoreScrollPosition } = useElementScroll<HTMLDivElement>({
    onReachedAtTop: () => {
      fetchMoreChats();
    },
  });

  useEffect(() => {
    restoreScrollPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    scrollToBottom();
  }, [lastChat, scrollToBottom]);

  useEffect(() => {
    const realtimeChatInsertChannel = chatActions.subscribeToInsert(channel.id, (chat) => {
      // stop loading
      setIsResponseGenerating(false);
      // remove last chat
      setLastChat(null);
      setResponse("");
      // push new chat
      setChats([...chats.filter((c) => !c.isGenerateing), chat as Conversation]);
      // scroll to bottom to view latest chat
      scrollToBottom();
      // refresh router to maintain data if redirect
      router.refresh();
    });

    const realtimeUpdatedChannel = channelActions.subscribeToUpdateByChannnel(
      channel.id,
      (updatedChannel) => {
        // update channel data
        setChannel(updatedChannel);
        // refresh router to maintain data if redirect
        router.refresh();
      }
    );

    const realtimeRemoveChannel = channelActions.subscribeToRemoveByChannel(
      channel.id,
      (oldChannel) => {
        if (oldChannel.id === channel.id) {
          // check if the removed channel is the current visible one
          // if yes then redirect to /chats page
          router.push("/chats");
        }
      }
    );

    return () => {
      unSubscribeChannels(realtimeChatInsertChannel, realtimeUpdatedChannel, realtimeRemoveChannel);
    };
  }, [channel, router, chats, scrollToBottom]);

  const messageQueue = (question: string): Message[] => {
    let chatId = 100;
    const previousChats: Message[] = [];
    const numOfItmes = Math.min(chats.length, 10);
    for (let i = 0; i < numOfItmes; i++) {
      const chat = chats[chats.length - numOfItmes + i];
      previousChats.push({ id: (chatId++).toString(), content: chat.question, role: "user" });
      previousChats.push({
        id: (chatId++).toString(),
        content: chat.answer,
        role: "assistant",
      });
    }

    // last question
    previousChats.push({ id: (chatId++).toString(), content: question, role: "user" });

    return previousChats;
  };

  const createLastChat = (question: string, answer?: string) => {
    setLastChat({
      id: Date.now().toString(),
      channel_id: channel.id,
      answer: answer ?? "",
      created_at: new Date().toISOString(),
      question,
      updated_at: null,
      metadata: "",
    });
  };

  const handleChatCreate = async (question: string) => {
    createLastChat(question);
    setIsResponseGenerating(true);

    try {
      let answer = "";
      let metadata;

      // const previousChats = messageQueue(question);

      // const res = await chatterService.chatWithAI(
      //   previousChats,
      //   ConversationType._getType(channel.conversation_type_id) === "Global" ? "admin" : channel.id
      // );

      // if (res.ok) {
      //   const reader = res.body?.getReader()!;
      //   setIsResponseGenerating(false);

      //   const processStream = async () => {
      //     while (true) {
      //       const { done, value } = await reader.read();

      //       // if done is true
      //       if (done) {
      //         console.log("stream completed");
      //         break;
      //       }

      //       // value is a binary data in Uint8Array format, as Uint8Array is suitable data structure for binary data
      //       // we decode Uint8Array using TextDecoder
      //       let chunk = new TextDecoder("utf-8").decode(value);

      //       // match the pattern for metadata
      //       const res = chunk.replace(/"metadata:(.?\[(?:...*)\])"$/, "");
      //       // get the metadata
      //       const match = chunk.match(/"metadata:(.?\[(?:...*)\])"$/);
      //       // assign it to the metadata
      //       if (match) {
      //         metadata = JSON.parse(match[0].replace(/metadata:/, ""));
      //       }

      //       answer += res;
      //       setResponse((prev) => prev + res);
      //     }
      //   };

      //   await processStream();
      // } else {
      //   answer = "Sorry ! something went wrong. Please try again.";
      // }

      const { data } = await chatService.generateAIAnswerFromServer({
        choice: ConversationType._getType(channel.conversation_type_id),
        collection_name: channel.id,
        previous_answer: chats.slice(-1).map((c) => c.answer),
        previous_question: chats.slice(-1).map((c) => c.question),
        query: question,
        elaborate: false,
        simplify: false,
        channel_type_id: channel.channel_type_id,
        embedding_model_id: channel.embedding_model_id ?? EmbeddingModel.OpenAI_Embedding,
        language_model_id: channel.language_model_id ?? LanguageModel.OpenAI_Model,
      });

      answer = data.answer;
      metadata = data.metadata;

      // insert the chat then update the channel
      await chatActions.create({
        question,
        answer: answer.trim(),
        channel_id: channel.id,
        metadata,
      });

      // update channel
      await channelActions.update(channel.id);
    } catch (error) {
      console.error(error);
      setIsResponseGenerating(false);
      setResponse("<p style='color: red'>Something went wrong.</p>");
    }
  };

  const resetChat = async () => {
    try {
      router.refresh();
      setChats([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex flex-col ${open ? "w-9/12" : "w-full"} h-screen overflow-hidden`}>
      <ChatHeader documents={userDocuments} channel={channel} onChatsRemoved={resetChat} />

      <div className="flex flex-col relative flex-grow overflow-x-auto pb-24 md:pb-0" ref={ref}>
        <Switch>
          <Case condition={isFetching}>
            <div className="absolute top-3 p-2 rounded-lg bg-slate-300 left-1/2 -translate-x-1/2">
              <div className="animate-loading h-8 w-8 rounded-full border-[5px] border-r-transparent border-primary"></div>
            </div>
          </Case>
        </Switch>
        <Switch>
          <Case condition={chats.length === 0 && lastChat === null}>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative h-20 w-20">
                <Image src="/assets/empty-message.png" fill alt="Empty Messages" />
              </div>
              <h2 className="text-lg font-semibold mt-4 mb-1 text-center">
                Start by adding question
              </h2>
              <p className="text-sm text-center">Type a question inside the bottom input box.</p>
            </div>
          </Case>
          <Default>
            <Messages chats={chats} user={user} channelId={channel.id} />
          </Default>
        </Switch>
        <Switch>
          <Case condition={lastChat !== null}>
            <ChatMessage
              user={user}
              channelId={channel.id}
              answer={response}
              question={lastChat?.question ?? ""}
              loading={isResponseGenerating}
            />
          </Case>
        </Switch>
      </div>

      <div className="fixed w-full bg-white bottom-0 flex items-center gap-x-4 px-4 md:px-10 py-4 border-t border-gray-200 md:relative">
        <Switch>
          <Case condition={isResponseGenerating}>
            <div className="bg-primary p-3 absolute z-50 -top-16 left-[50%] -translate-x-1/2 rounded-lg">
              <div className="flex items-center gap-3">
                <RepeatIcon height={22} width={22} className="fill-slate-50 animate-spin" />
                <span className="text-slate-50 text-sm">Generating Answer</span>
              </div>
            </div>
          </Case>
        </Switch>
        <ChatInput loading={isResponseGenerating} onChangeInput={handleChatCreate} />
      </div>
    </div>
  );
}
