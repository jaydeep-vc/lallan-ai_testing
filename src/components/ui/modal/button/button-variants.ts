import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

export const button = cva(
  "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm shadow-sm sm:w-auto",
  {
    variants: {
      intent: {
        primary: "bg-green-600 text-white hover:bg-green-500 sm:ml-3",
        danger: "bg-red-600 text-white hover:bg-red-500",
        info: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0",
      },
    },
    defaultVariants: {
      intent: "info",
    },
  }
);

export interface ModalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  loading?: boolean;
}
