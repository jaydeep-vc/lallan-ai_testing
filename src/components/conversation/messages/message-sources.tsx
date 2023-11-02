"use client";

import Link from "next/link";
import React, { useState } from "react";

import { AttachIcon, FileIcon, CloseIcon } from "@/components/icons";

import { SourceWithPages } from "@/lib/MetadataParser";
import { extractFileNameFromUrl } from "@/lib/url-parser";

const ADMIN_PATH_URL = "https://xhtdhawnyeaphxraxbeg.supabase.co/storage/v1/object/public/Admin/";
const USER_PATH_URL = "https://xhtdhawnyeaphxraxbeg.supabase.co/storage/v1/object/public/user/";

interface MessageSourceProps {
  userId: string;
  channelId: string;
  sources: SourceWithPages[] | null;
}

export default function MessageSources({ sources, userId, channelId }: MessageSourceProps) {
  const [viewPage, setViewPage] = useState<number>(0);
  const [url, setUrl] = useState<string | undefined>();

  function generateFileUrl(source: string): string {
    return source && source.includes("admin")
      ? `${ADMIN_PATH_URL}${extractFileNameFromUrl(source, {
          replaceWhiteSpaceEncodding: true,
        })}`
      : `${USER_PATH_URL}${userId}/${channelId}/${extractFileNameFromUrl(source, {
          replaceWhiteSpaceEncodding: true,
        })}`;
  }

  if (sources === null || sources.length === 0) return false;

  return (
    <>
      <hr className="my-4" />
      <h1 className="text-lg font-bold flex gap-2 items-center text-primary mb-6">
        <FileIcon height={24} width={24} className="stroke-primary" /> Sources
      </h1>

      <div className="flex flex-wrap gap-4 mt-2 w-full">
        {sources.map(({ pages, source }, index) => {
          const url = generateFileUrl(source);

          return (
            <div key={`_${source}${index}`} className="w-full">
              <div className="flex items-center gap-2 mb-1">
                {pages
                  .sort((a, b) => a - b)
                  .map((page) => (
                    <div key={`_${source}_${page}`} className="relative group/item">
                      <button
                        onClick={() => {
                          setViewPage(page);
                          setUrl(url);
                        }}
                        className="cursor-pointer border-2 border-primary h-[20px] min-w-[20px] p-1 text-center rounded-full text-xs flex justify-center items-center text-primary"
                      >
                        {page}
                      </button>
                    </div>
                  ))}
              </div>

              <div className="w-fit max-w-full bg-white rounded-xl truncate py-1 px-1.5 flex items-center gap-2 border-2 border-slate-400">
                <AttachIcon height={20} width={20} className="stroke-slate-500 shrink-0" />
                <Link href={url} target="_blank" className="text-sm truncate text-slate-500">
                  {extractFileNameFromUrl(source, { replaceWhiteSpaceEncodding: true })}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {viewPage > 0 && (
        <div className="fixed top-0 right-0 h-full w-full z-50">
          <div className="absolute bg-black/10 h-full w-full" onClick={() => setViewPage(-1)}></div>
          <div className="h-4/5 w-full md:h-full md:w-3/5 rounded-tl-2xl rounded-tr-2xl md:rounded-none bg-slate-50 absolute bottom-0 right-0 md:top-0 transition-all">
            <button
              className="absolute left-4 md:-left-11 -top-10 md:top-2 rounded-md bg-slate-700 p-1"
              onClick={() => setViewPage(0)}
            >
              <CloseIcon height={24} width={24} color="white" />
            </button>

            <div className="px-8 py-8 h-full flex flex-col gap-3">
              <h1 className="text-lg truncate">{extractFileNameFromUrl(url!)}</h1>
              <hr />
              <div className="flex-grow overflow-y-auto">
                <iframe src={url + "#page=" + viewPage} className="w-full h-full" title="PDF-File">
                  File Not Found
                </iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
