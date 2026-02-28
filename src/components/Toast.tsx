// store
import { useToastStore } from "../store/toastStore";

export default function Toast() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-50 flex w-[360px] flex-col gap-2">
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
            <p className="text-[16px]">txHash: {toast.txHash || ""}</p>
          </div>
        );
      })}
    </div>
  );
}
