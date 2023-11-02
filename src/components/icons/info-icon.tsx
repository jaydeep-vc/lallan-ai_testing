import type { IconProps } from "./type";

export const InfoIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55 30C55 43.807 43.807 55 30 55C16.1929 55 5 43.807 5 30C5 16.1929 16.1929 5 30 5C43.807 5 55 16.1929 55 30ZM30 44.375C31.0355 44.375 31.875 43.5355 31.875 42.5V27.5C31.875 26.4645 31.0355 25.625 30 25.625C28.9645 25.625 28.125 26.4645 28.125 27.5V42.5C28.125 43.5355 28.9645 44.375 30 44.375ZM30 17.5C31.3807 17.5 32.5 18.6193 32.5 20C32.5 21.3807 31.3807 22.5 30 22.5C28.6193 22.5 27.5 21.3807 27.5 20C27.5 18.6193 28.6193 17.5 30 17.5Z"
        fill="white"
      />
    </svg>
  </>
);
