import type { IconProps } from "./type";

export const EditIcon: React.FC<IconProps> = ({
  height,
  width,
  color = "black",
  className,
  onClick,
}) => (
  <svg
    width={height}
    height={width}
    viewBox="0 0 21 22"
    fill="none"
    className={`stroke-${color} ${className ?? ""}`}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_165_175)">
      <path
        d="M9.625 1.85001H7.875C3.5 1.85001 1.75 3.60001 1.75 7.97501V13.225C1.75 17.6 3.5 19.35 7.875 19.35H13.125C17.5 19.35 19.25 17.6 19.25 13.225V11.475"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.035 2.74251L7.14 9.63751C6.8775 9.90001 6.615 10.4163 6.5625 10.7925L6.18625 13.4263C6.04625 14.38 6.72 15.045 7.67375 14.9138L10.3075 14.5375C10.675 14.485 11.1913 14.2225 11.4625 13.96L18.3575 7.06501C19.5475 5.87501 20.1075 4.49251 18.3575 2.74251C16.6075 0.992514 15.225 1.55251 14.035 2.74251Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0462 3.73126C13.3364 4.76155 13.8862 5.70007 14.6431 6.45693C15.3999 7.21378 16.3385 7.76362 17.3687 8.05376"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_165_175">
        <rect
          width="21"
          height="21"
          fill="white"
          transform="translate(0 0.100006)"
        />
      </clipPath>
    </defs>
  </svg>
);
