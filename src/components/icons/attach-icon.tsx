import type { IconProps } from "./type";

export const AttachIcon: React.FC<IconProps> = ({
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
        d="M12.2 11.8L10.79 13.21C10.01 13.99 10.01 15.26 10.79 16.04C11.57 16.82 12.84 16.82 13.62 16.04L15.84 13.82C16.5891 13.0687 17.0098 12.051 17.0098 10.99C17.0098 9.92902 16.5891 8.91132 15.84 8.16001C15.0886 7.41086 14.0709 6.99017 13.01 6.99017C11.949 6.99017 10.9313 7.41086 10.18 8.16001L7.75996 10.58C7.44133 10.8984 7.18856 11.2764 7.0161 11.6925C6.84365 12.1086 6.75488 12.5546 6.75488 13.005C6.75488 13.4554 6.84365 13.9014 7.0161 14.3175C7.18856 14.7336 7.44133 15.1117 7.75996 15.43"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);
