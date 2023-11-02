import type { IconProps } from "./type";

export const PlusIcon: React.FC<IconProps> = ({
  height,
  width,
  color = "black",
  className,
  onClick,
}) => (
  <svg
    width={height}
    height={width}
    className={`fill-current text-${color} ${className ?? ""}`}
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path d="M15.6111 8.98889H1.38889C0.902963 8.98889 0.5 8.58592 0.5 8.1C0.5 7.61407 0.902963 7.21111 1.38889 7.21111H15.6111C16.097 7.21111 16.5 7.61407 16.5 8.1C16.5 8.58592 16.097 8.98889 15.6111 8.98889Z" />
    <path d="M8.5 16.1C8.01408 16.1 7.61111 15.697 7.61111 15.2111V0.988887C7.61111 0.502961 8.01408 0.0999985 8.5 0.0999985C8.98593 0.0999985 9.38889 0.502961 9.38889 0.988887V15.2111C9.38889 15.697 8.98593 16.1 8.5 16.1Z" />
  </svg>
);
