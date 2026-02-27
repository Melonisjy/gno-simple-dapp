import { create } from "zustand";

type AccountPayLoad = {
  address: string;
  chainId: string;
};

type WalletState = {
  isConnected: boolean;
  address: string;
  balanceUgnot: string;
  chainId: string;
  setAccount: (payload: AccountPayLoad) => void;
  setBalance: (balanceUgnot: string) => void;
};

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
