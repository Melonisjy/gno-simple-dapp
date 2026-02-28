// components
import Button from "../components/Button";
import Card from "../components/Card";

// store
import { useWalletStore } from "../store/walletStore";

const PORTAL_LOOP_CHAIN_ID = "portal-loop";
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
      if (!account.data.address) throw new Error("No address");

      if (account.data.chainId !== PORTAL_LOOP_CHAIN_ID) {
        await window.adena.SwitchNetwork(PORTAL_LOOP_CHAIN_ID);
        account = await window.adena.GetAccount();
      }
      setAccount({
        address: account.data.address,
        chainId: account.data.chainId,
      });
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
          <Button enabled={!isReady} onClick={connectWallet} label="Connect" />
        </Card>
        <Card title="Get Gno.land Address">
          <Button enabled={isReady} label="Get Address" />
          <p>Address:</p>
        </Card>
        <Card title="Get Balance">
          <Button enabled={isReady} label="Get Balance" />
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
          <Button enabled={isReady} label="Send" />
        </Card>
      </div>
    </main>
  );
}
