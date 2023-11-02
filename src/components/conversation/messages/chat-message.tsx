"use client";

import { forwardRef, ForwardedRef } from "react";

import type { User } from "@/actions/users";

import Answer from "./answer";
import Question from "./question";

interface ChatMessageProps {
  user: User;
  loading?: boolean;
  channelId: string;
  answer: string;
  question: string;
  metadata?: string;
}

const ChatMessage = (props: ChatMessageProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { answer, question, user, metadata, loading, channelId } = props;

  return (
    <div className="w-full" ref={ref}>
      <Question user={user} question={question} />
      <Answer
        message={answer}
        metadata={metadata}
        loading={loading}
        userId={user.id}
        channelId={channelId}
      />
    </div>
  );
};

export default forwardRef(ChatMessage);
