import { IconProps } from "@/components/icons/type";

export interface ModalIconProps {
  Icon: React.ComponentType<IconProps>;
  color: string;
}

export default function ModalIcon({ Icon, color }: ModalIconProps) {
  return (
    <div
      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-${color}-100 sm:mx-0 sm:h-10 sm:w-10`}
    >
      <Icon className={`h-6 w-6 stroke-${color}-900`} />
    </div>
  );
}
