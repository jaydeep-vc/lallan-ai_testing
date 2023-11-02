import React from "react";

import { IconProps } from "../icons/type";

interface Props {
  heading: string;
  description: string;
  Icon: React.ElementType<IconProps>;
}

export default function ChatCard({ heading, description, Icon }: Props) {
  return (
    <div className="w-1/3 flex border border-slate-400 justify-start items-start rounded-md px-3 py-3 gap-4">
      <Icon height={22} width={22} className="shrink-0" />
      <div>
        <h1 className="text-md uppercase text-bold">{heading}</h1>
        <p className="text-slate-500 text-sm">{description}</p>
      </div>
    </div>
  );
}
