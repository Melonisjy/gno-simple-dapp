type ToastStatus = "Transaction Success" | "Transaction Failed";

type ToastItem = {
  id: string;
  status: ToastStatus;
  txHash: string;
};

export type ToastState = {
  toasts: ToastItem[];
  addToast: (toast: ToastItem) => void;
  removeToast: (id: string) => void;
};
