import type { IconProps } from "./type";

export const FileIcon: React.FC<IconProps> = ({
  height,
  width,
  color = "black",
  className,
  onClick,
}) => (
  <>
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
        stroke="#0B0B0B"
        strokeOpacity="0.9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13H13M7 17H11M22 10H18C15 10 14 9 14 6V2L22 10Z"
        stroke="#0B0B0B"
        strokeOpacity="0.9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);
