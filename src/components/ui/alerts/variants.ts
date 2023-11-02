import { cva, type VariantProps } from "class-variance-authority";

export const alert = cva("alert ", {
  variants: {
    intent: {
      success: "success",
      error: "error",
      info: "info",
    },
    size: {
      small: "",
      medium: "",
    },
  },
  defaultVariants: {
    intent: "info",
    size: "medium",
  },
});

export interface AlertProps extends VariantProps<typeof alert> {
  message: string;
  onClose?: () => void;
}
