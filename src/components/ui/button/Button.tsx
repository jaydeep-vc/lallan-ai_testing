import { SpnningIcon } from "@/components/icons";
import { ButtonProps, button } from "./common";

const renderContent = (loading: boolean, icon: any, children: any) => {
  if (loading) return <SpnningIcon />;

  return (
    <>
      {icon && icon}
      {children}
    </>
  );
};

export default function Button({
  className,
  children,
  intent,
  size,
  diverse,
  loading = false,
  disabled,
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ? disabled : loading ? loading : false}
      className={`${button({ diverse, intent, size, className })} ${loading ? "loading" : ""} `}
      {...props}
    >
      {renderContent(loading, icon, children)}
    </button>
  );
}
