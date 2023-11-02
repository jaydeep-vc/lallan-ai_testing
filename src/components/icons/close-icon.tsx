import type { IconProps } from "./type";

export const CloseIcon: React.FC<IconProps> = ({
  height,
  width,
  color = "black",
  className,
  onClick,
}) => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={height}
      height={width}
      className={`fill-current text-${color} ${className ?? ""}`}
      viewBox="0 0 61 61"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4769 13.8647C14.4532 12.8884 16.0361 12.8884 17.0124 13.8647L30.2446 27.0969L43.4769 13.8647C44.4531 12.8884 46.0361 12.8884 47.0124 13.8647C47.9886 14.841 47.9886 16.4239 47.0124 17.4002L33.7801 30.6324L47.0124 43.8647C47.9886 44.8409 47.9886 46.4239 47.0124 47.4002C46.0361 48.3764 44.4531 48.3764 43.4769 47.4002L30.2446 34.1679L17.0124 47.4002C16.0361 48.3764 14.4532 48.3764 13.4769 47.4002C12.5006 46.4239 12.5006 44.8409 13.4769 43.8647L26.7091 30.6324L13.4769 17.4002C12.5006 16.4239 12.5006 14.841 13.4769 13.8647Z"
      />
    </svg>
  </>
);
