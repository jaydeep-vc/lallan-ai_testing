import { button, type ModalButtonProps } from "./button/button-variants";

export const ModalButton: React.FC<ModalButtonProps> = ({
  intent,
  className,
  children,
  loading,
  disabled,
  ...rest
}) => {
  return (
    <button className={button({ intent, className })} disabled={disabled || loading} {...rest}>
      {loading}
      {children}
    </button>
  );
};

export interface ModalBottomProps {
  children: React.ReactElement<ModalBottomProps>[];
}

export function ModalBottom({ children }: ModalBottomProps) {
  return <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">{children}</div>;
}
