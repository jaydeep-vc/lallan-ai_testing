import { cva, type VariantProps } from "class-variance-authority";

export const avatar = cva("rounded-full flex items-center justify-center text-white", {
  variants: {
    size: {
      full: "h-full w-full text-3xl font-bold",
      medium: "h-10 h-10 text-xl font-bold",
      small: "h-6 w-6 text-sm",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export interface AvatarProps extends VariantProps<typeof avatar> {
  name: string;
}
