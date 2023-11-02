import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import MetadataParser from "@/lib/MetadataParser";

import { CopyIcon, CorrectIcon } from "@/components/icons";
import Switch, { Case, Default } from "@/components/utils/switch";

import MessageSources from "./message-sources";

interface AnswerProps {
  loading?: boolean;
  metadata?: string;
  message: string;
  userId: string;
  channelId: string;
}

export default function MessageContent({
  loading,
  message,
  metadata,
  userId,
  channelId,
}: AnswerProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const parser = new MetadataParser(metadata ?? "");
  const sources = parser.extractSourceWithPageNumber();
  const openAISource = parser.extractOpenAIMetadata();

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  const handleCopyText = () => {
    try {
      if (navigator) {
        navigator.clipboard.writeText(message);
        setIsCopied(true);
      }
    } catch (error) {}
  };

  return (
    <div className="bg-white py-6">
      <div className="w-full px-4 md:px-0 md:w-3/5 mx-auto flex justify-start gap-5">
        <div className="w-[24px] h-[24px] relative flex justify-center items-center flex-shrink-0 select-none mt-[2px]">
          <Image src="/assets/logo-frame.png" alt="Lallan.AI" className="select-none" fill />
        </div>
        <Switch describe="Check whether it is loading or not in the">
          <Case condition={loading === true}>
            <div className="animate-pulse w-full flex flex-col gap-3">
              <div className="h-5 w-full rounded-lg bg-slate-300"></div>
              <div className="h-5 w-2/4 rounded-lg bg-slate-300"></div>
            </div>
          </Case>

          <Default>
            <div className="flex-grow overflow-hidden">
              <div className="prose text-to-crop">
                <ReactMarkdown
                  // @ts-expect-error
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  // className="whitespace-pre-wrap"
                >
                  {message}
                </ReactMarkdown>
              </div>

              {/* Sources are here */}
              <MessageSources
                sources={sources.length > openAISource.length ? sources : openAISource}
                userId={userId}
                channelId={channelId}
              />
            </div>

            <div className="flex justify-start items-start">
              <Switch describe="For checkinng if the check we clicked to copied the content">
                <Case condition={isCopied === true}>
                  <button
                    className="outline-none px-[3px] py-[3px] rounded-sm focus:bg-slate-200"
                    tabIndex={-1}
                    disabled
                  >
                    <CorrectIcon height={16} width={16} />
                  </button>
                </Case>
                <Default>
                  <button
                    className="outline-none px-[3px] py-[3px] rounded-md focus:bg-slate-200"
                    onClick={() => handleCopyText()}
                    tabIndex={-1}
                  >
                    <CopyIcon height={16} width={16} className="stroke-slate-900" />
                  </button>
                </Default>
              </Switch>
            </div>
          </Default>
        </Switch>
      </div>
    </div>
  );
}
