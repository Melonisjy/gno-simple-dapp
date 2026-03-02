// react
import { useEffect } from "react";

// store
import { useToastStore } from "../store/toastStore";

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 3000),
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-4 right-4 z-50 flex max-w-[95vw] flex-col gap-2">
      {toasts.map((toast) => {
        const isTxSuccess = toast.status === "Transaction Success";

        return (
          <div key={toast.id} className="rounded-md border bg-white p-3">
            <p
              className={`text-[16px] font-semibold ${
                isTxSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {isTxSuccess ? "Transaction Success" : "Transaction Failed"}
            </p>
            {toast.errorMessage && (
              <p className="text-sm text-red-400">{toast.errorMessage}</p>
            )}
            <p className="mt-1 text-[16px]">txHash: {toast.txHash || "-"}</p>
          </div>
        );
      })}
    </div>
  );
}
