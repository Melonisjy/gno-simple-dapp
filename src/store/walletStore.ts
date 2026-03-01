// zustand
import { create } from "zustand";

// types
import type { WalletState } from "../types/wallet";

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: "",
  balanceUgnot: "",
  chainId: "",

  setAccount: ({ address, chainId }) =>
    set({
      isConnected: true,
      address,
      chainId,
    }),

  setBalance: (balanceUgnot) => {
    set({
      balanceUgnot,
    });
  },
}));
