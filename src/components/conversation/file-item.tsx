"use client";

import Link from "next/link";

import { DeleteIcon, FileIcon } from "../icons";

interface ChannelItemProps {
  name: string;
  href: string;
  onRemove?: () => void;
}

export default function FileItem({ name, href, onRemove, ...props }: ChannelItemProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center justify-between py-4 text-gray-900 rounded-lg hover:text-primary group"
      download={true}
      {...props}
    >
      <div className="flex items-center gap-[12px] flex-1 overflow-hidden">
        <FileIcon height={24} width={24} className="shrink-0" />
        <p className="truncate">{name}</p>
      </div>
      <DeleteIcon
        height={22}
        width={22}
        className="cursor-pointer shrink-0"
        onClick={(e) => {
          e.preventDefault();
          if (onRemove) onRemove();
        }}
      />
    </Link>
  );
}
