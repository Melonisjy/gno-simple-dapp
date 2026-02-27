// component
import Card from "../components/Card";

// store
import { useWalletStore } from "../store/walletStore";

type AdenaProvider = {
  AddEstablish: (appName: string) => Promise<unknown>;
  SwitchNetwork: (chainId: string) => Promise<unknown>;
  GetAccount: () => Promise<{
    code: number;
    status: string;
    data: {
      address: string;
      coins: string;
      chainId: string;
    };
  }>;
};

declare global {
  interface Window {
    adena?: AdenaProvider;
  }
}

export default function HomePage() {
  const PORTAL_LOOP_CHAIN_ID = "portal-loop";

  const { isConnected, chainId, setAccount } = useWalletStore();
  const isReady = isConnected && chainId === PORTAL_LOOP_CHAIN_ID;

  const connectWallet = async () => {
    if (!window.adena) {
      window.open("https://adena.app/", "_blank");
      return;
    }

    try {
      await window.adena.AddEstablish("Adena");

      let account = await window.adena.GetAccount();
      let address = account.data.address ?? "";
      let currentChainId = account.data.chainId ?? "";

      if (!address) throw new Error("No address");

      if (currentChainId !== PORTAL_LOOP_CHAIN_ID) {
        const res = await window.adena.SwitchNetwork(PORTAL_LOOP_CHAIN_ID);
        console.log(res);
        account = await window.adena.GetAccount();
        address = account.data.address ?? "";
        currentChainId = account.data.chainId ?? "";
      }

      setAccount({ address, chainId: currentChainId });
      console.log(account);
    } catch (err) {
      console.error("wallet connection failed", err);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-10 text-center text-[24px] font-semibold">
        Request to Gno.land via Adena wallet
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Connect Adena Wallet">
          <button
            className={`h-11 w-full rounded-md text-[16px] text-white ${isReady ? "bg-[#808080]" : "bg-[#2c4be2]"}`}
            onClick={connectWallet}
            disabled={isReady}
          >
            Connect
          </button>
        </Card>
        <Card title="Get Gno.land Address">
          <button
            className={`h-11 w-full rounded-md text-[16px] text-white ${isReady ? "bg-[#2c4be2]" : "bg-[#808080]"}`}
            disabled={!isReady}
          >
            Get Address
          </button>
          <p>Address:</p>
        </Card>
        <Card title="Get Balance">
          <button
            className={`h-11 w-full rounded-md text-[16px] text-white ${isReady ? "bg-[#2c4be2]" : "bg-[#808080]"}`}
            disabled={!isReady}
          >
            Get Balance
          </button>
          <p>Balance:</p>
        </Card>
        <Card title="Send GNOT">
          <label className="block">
            <span className="mb-1 block">Recipient:</span>
            <input className="h-10 w-full rounded-md border border-gray-400 px-3 text-[12px]" />
          </label>
          <label className="block">
            <span className="mb-1 block">Amount:</span>
            <input className="h-10 w-full rounded-md border border-gray-400 px-3 text-[12px]" />
          </label>
          <button
            className={`h-11 w-full rounded-md text-[16px] text-white ${isReady ? "bg-[#2c4be2]" : "bg-[#808080]"}`}
            disabled={!isReady}
          >
            Send
          </button>
        </Card>
      </div>
    </main>
  );
}
