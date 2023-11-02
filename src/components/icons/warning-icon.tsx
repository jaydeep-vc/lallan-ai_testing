import type { IconProps } from "./type";

export const WarningIcon: React.FC<IconProps> = ({
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
        d="M30 45C31.3807 45 32.5 43.8807 32.5 42.5C32.5 41.1193 31.3807 40 30 40C28.6193 40 27.5 41.1193 27.5 42.5C27.5 43.8807 28.6193 45 30 45Z"
        fill="white"
      />
      <path
        d="M30 25V35"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.61807 45.264L25.5278 11.4443C27.3705 7.75902 32.6295 7.75905 34.4723 11.4443L51.382 45.264C53.0443 48.5885 50.6268 52.5 46.9098 52.5H13.0902C9.37327 52.5 6.95579 48.5885 8.61807 45.264Z"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);
