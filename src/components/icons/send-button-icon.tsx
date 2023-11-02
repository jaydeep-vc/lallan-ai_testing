import type { IconProps } from "./type";

export const SendButtonIcon: React.FC<IconProps> = ({
  height,
  width,
  color = "black",
  className,
  onClick,
}) => (
  <svg
    width={height}
    height={width}
    viewBox="0 0 24 24"
    fill="none"
    className={`stroke-${color} ${className ?? ""}`}
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M2.71734 8.05442C0.720543 11.3472 9.52377 14.304 9.52377 14.304C9.52377 14.304 12.4806 23.1072 15.7734 21.1104C19.2678 18.9792 23.4534 5.88483 20.6886 3.13923C17.9238 0.393627 4.84854 4.56002 2.71734 8.05442Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.072 8.75519L9.52319 14.304"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
