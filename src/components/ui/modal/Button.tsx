import { button, type ModalButtonProps } from "./button/button-variants";

export default function Button({ intent, className, ...rest }: ModalButtonProps) {
  return <button className={button({ intent, className })} {...rest} />;
}
