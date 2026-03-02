type AccountData = {
  address: string;
  coins: string;
  chainId: string;
};

export type AdenaProvider = {
  AddEstablish: (appName: string) => Promise<unknown>;
  SwitchNetwork: (chainId: string) => Promise<unknown>;
  GetAccount: () => Promise<{
    code: number;
    status: string;
    data: AccountData;
  }>;
  DoContract: (payload: {
    messages: Array<{
      type: string;
      value: {
        from_address: string;
        to_address: string;
        amount: string;
      };
    }>;
    memo?: string;
  }) => Promise<{
    status?: "success" | "failure";
    data?: { hash?: string };
  }>;
};

type AccountPayload = {
  address: string;
  chainId: string;
};

export type WalletState = {
  isConnected: boolean;
  address: string;
  balanceUgnot: string;
  chainId: string;
  setAccount: (payload: AccountPayload) => void;
  setBalance: (balanceUgnot: string) => void;
};

export type AdenaError = {
  code?: number;
  type?: string;
  status?: "success" | "failure";
  message?: string;
  data?: { hash?: string };
};
