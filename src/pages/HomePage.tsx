// react
import { useState } from "react";

// components
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

// store
import { useWalletStore } from "../store/walletStore";

const STAGING_CHAIN_ID = "staging";

type AccountData = {
  address: string;
  coins: string;
  chainId: string;
};

type AdenaProvider = {
  AddEstablish: (appName: string) => Promise<unknown>;
  SwitchNetwork: (chainId: string) => Promise<unknown>;
  GetAccount: () => Promise<{
    code: number;
    status: string;
    data: AccountData;
  }>;
};

declare global {
  interface Window {
    adena?: AdenaProvider;
  }
}

export default function HomePage() {
  const {
    isConnected,
    chainId,
    address,
    balanceUgnot,
    setAccount,
    setBalance,
  } = useWalletStore();

  const isReady = isConnected && chainId === STAGING_CHAIN_ID;

  const [isAddressVisible, setIsAddressVisible] = useState<boolean>(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);

  const onConnect = async () => {
    if (!window.adena) {
      window.open("https://adena.app/", "_blank");
      return;
    }

    try {
      await window.adena.AddEstablish("Adena");
      let account = await window.adena.GetAccount();
      if (!account.data.address) throw new Error("No address");

      if (account.data.chainId !== STAGING_CHAIN_ID) {
        await window.adena.SwitchNetwork(STAGING_CHAIN_ID);

        account = await window.adena.GetAccount();
      }
      setAccount({
        address: account.data.address,
        chainId: account.data.chainId,
      });
      setBalance(account.data.coins);
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
          <Button enabled={!isReady} onClick={onConnect} label="Connect" />
        </Card>
        <Card title="Get Gno.land Address">
          <Button
            enabled={isReady}
            onClick={() => setIsAddressVisible(true)}
            label="Get Address"
          />
          <p>Address: {isAddressVisible ? address : ""}</p>
        </Card>
        <Card title="Get Balance">
          <Button
            enabled={isReady}
            onClick={() => setIsBalanceVisible(true)}
            label="Get Balance"
          />
          <p>Balance: {isBalanceVisible ? balanceUgnot || "0ugnot" : ""}</p>
        </Card>
        <Card title="Send GNOT">
          <Input label="Recipient:" placeholder="g1..." />
          <Input label="Amount:" placeholder="1000000ugnot" />
          <Button enabled={isReady} label="Send" />
        </Card>
      </div>
    </main>
  );
}
