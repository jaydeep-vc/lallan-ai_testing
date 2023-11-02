import type { ToastAlert } from "@/context/toast-context";
import { CloseIcon, ErrorIcon, SuccessIcon, WarningIcon, InfoIcon } from "@/components/icons";

interface ToastProps extends ToastAlert {
  onClose: (id: string) => void;
}

export default function Toast({ id, onClose, title, type, message }: ToastProps) {
  return (
    <div className="relative overflow-hidden rounded-md text-white">
      <div className="absolute top-1 right-1">
        <button
          type="button"
          className="pointer-events-auto inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => onClose(id)}
        >
          <span className="sr-only">Dismiss</span>
          <CloseIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div
        className={`px-2 py-4 ${
          type === "success"
            ? "bg-[#06d6a0]"
            : type === "error"
            ? "bg-[#ef476f]"
            : type === "warning"
            ? "bg-[#e98601]"
            : "bg-primary"
        }`}
      >
        <div className="flex items-center gap-x-3">
          <div className="flex-shrink-0">
            {type === "success" ? (
              <SuccessIcon height={20} width={20} className="h-8 w-8" />
            ) : type === "error" ? (
              <ErrorIcon height={20} width={20} className="h-8 w-8" />
            ) : type === "warning" ? (
              <WarningIcon height={20} width={20} className="h-8 w-8" />
            ) : (
              <InfoIcon height={20} width={20} className="h-8 w-8" />
            )}
          </div>
          <div>
            <p className="font-poppins">{title}</p>
            {message && <p className="mt-1 text-xs">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
