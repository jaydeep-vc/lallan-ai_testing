import type { ToastAlert } from "@/context/toast-context";
// hooks
import useToast from "@/hooks/use-toast";
// components
import Toast from "./Toast";

const ToastAlerts = () => {
  const { alerts, removeAlert } = useToast();

  if (!alerts) return null;

  return (
    <div className="pointer-events-none fixed top-0 right-0 md:top-2 md:right-2 z-50 h-full w-full md:w-96 space-y-5 overflow-hidden">
      <div className="p-2">
        {alerts.map((alert: ToastAlert) => (
          <Toast key={alert.id} {...alert} onClose={(id) => removeAlert(id)} />
        ))}
      </div>
    </div>
  );
};

export default ToastAlerts;
