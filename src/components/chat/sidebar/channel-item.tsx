"use client";

import Link, { LinkProps } from "next/link";
import { ChannelIcon, DeleteIcon, EditIcon } from "@/components/icons";

interface ChannelItemProps extends LinkProps {
  name: string;
  active?: boolean;
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function ChannelItem({
  name,
  href,
  active = false,
  onEdit,
  onRemove,
  ...props
}: ChannelItemProps) {
  const handleDeleteClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (onRemove) onRemove();
  };

  const handleEditClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (onEdit) onEdit();
  };

  return (
    <Link
      href={href}
      className={`flex gap-[12px] rounded-[8px] p-[12px] justify-between 
      hover:bg-primary-100 focus:bg-primary-100 focus:outline-primary-500
      ${active ? "bg-primary-600" : ""} 
      transition-none group`}
      {...props}
    >
      <div className="flex items-center gap-[12px] flex-1 overflow-hidden">
        <ChannelIcon height={24} width={24} className="shrink-0" />
        <p className="truncate m-0">{name}</p>
      </div>
      <div className={`gap-[12px] shrink-0 flex md:hidden group-hover:flex`}>
        <EditIcon height={22} width={22} className="cursor-pointer" onClick={handleEditClick} />
        <DeleteIcon height={22} width={22} className="cursor-pointer" onClick={handleDeleteClick} />
      </div>
    </Link>
  );
}
