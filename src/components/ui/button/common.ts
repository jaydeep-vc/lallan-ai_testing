import { cva, type VariantProps } from "class-variance-authority";
import { type IconProps } from "@/components/icons/type";

export const button = cva("app-button", {
  variants: {
    intent: {
      primary: "primary",
      secondary: "secondary",
      success: "bg-green-600 text-white hover:bg-green-500 sm:ml-3",
      danger: "bg-red-600 text-white hover:bg-red-500",
      info: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0",
    },
    size: {
      small: "small",
      medium: "medium",
    },
    diverse: {
      main: "main",
      outline: "outline",
      text: "text",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
    diverse: "main",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  icon?: React.ReactElement<IconProps>;
  loading?: boolean;
}
