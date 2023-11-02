import type { IconProps } from "./type";

export const ChannelIcon: React.FC<IconProps> = ({
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
      className={`stroke-${color} ${className ?? ""}`}
      onClick={onClick}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2.60001H8C4 2.60001 2 4.60001 2 8.60001V21.6C2 22.15 2.45 22.6 3 22.6H16C20 22.6 22 20.6 22 16.6V8.60001C22 4.60001 20 2.60001 16 2.60001Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10.1H17M7 15.1H14"
        stroke="black"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);
