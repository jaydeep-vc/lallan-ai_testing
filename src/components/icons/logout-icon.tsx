import type { IconProps } from "./type";

export const LogoutIcon: React.FC<IconProps> = ({ height, width, className, onClick }) => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={height}
      height={width}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      onClick={onClick}
    >
      <path
        d="M17.44 14.62L20 12.06L17.44 9.5M9.76001 12.06H19.93M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);
