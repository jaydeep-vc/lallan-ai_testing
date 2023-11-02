import { alert, AlertProps } from "./variants";
import { CloseIcon } from "@/components/icons";

const Alert: React.FC<AlertProps> = ({ intent, size, message, onClose }) => {
  return (
    <div className={alert({ intent, size })}>
      <p>{message}</p>
      <button onClick={onClose}>
        <CloseIcon height={18} width={18} />
      </button>
    </div>
  );
};

export default Alert;
