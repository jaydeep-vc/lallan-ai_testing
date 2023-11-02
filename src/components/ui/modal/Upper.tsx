import { type ModalContentProps } from "./Content";
import { type ModalIconProps } from "./ModalIcon";

interface ModalUpperProps {
  children: React.ReactElement<ModalIconProps> | React.ReactElement<ModalContentProps>;
}

export default function Upper({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">{children}</div>
    </div>
  );
}
