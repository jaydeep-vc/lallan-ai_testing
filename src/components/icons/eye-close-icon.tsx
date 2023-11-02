import type { IconProps } from "./type";

export const EyeCloseIcon: React.FC<IconProps> = ({
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
        d="M14.53 9.47002L9.46996 14.53C8.79896 13.859 8.422 12.949 8.422 12C8.422 11.5302 8.51454 11.0649 8.69435 10.6308C8.87416 10.1967 9.13771 9.80226 9.46996 9.47002C9.8022 9.13777 10.1966 8.87422 10.6307 8.69441C11.0648 8.5146 11.5301 8.42206 12 8.42206C12.9489 8.42206 13.859 8.79902 14.53 9.47002Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.46997 3.72998 5.17997 5.80998 2.88997 9.40998C1.98997 10.82 1.98997 13.19 2.88997 14.6C3.67997 15.84 4.59997 16.91 5.59997 17.77M8.41997 19.53C9.55997 20.01 10.77 20.27 12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39998C20.78 8.87998 20.42 8.38998 20.05 7.92998"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.51 12.7C15.3745 13.3976 15.0337 14.0387 14.5312 14.5412C14.0287 15.0437 13.3876 15.3845 12.69 15.52M9.47 14.53L2 22M22 2L14.53 9.47"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);
