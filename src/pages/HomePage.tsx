// react
import { useState } from "react";

// components
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

// stores
import { useWalletStore } from "../store/walletStore";
import { useToastStore } from "../store/toastStore";

// type
import type { AdenaError } from "../types/wallet";

// constant
const STAGING_CHAIN_ID = "staging";
const TX_SUCCESS = "Transaction Success" as const;
const TX_FAILED = "Transaction Failed" as const;

export default function HomePage() {
  const { addToast } = useToastStore();
  const {
    isConnected,
    chainId,
    address,
    balanceUgnot,
    setAccount,
    setBalance,
  } = useWalletStore();

  const isReady = isConnected && chainId === STAGING_CHAIN_ID;

  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const getErrorMessage = (error: unknown) => {
    const e = error as AdenaError;

    if (e?.code === 1002 || e?.type === "INVALID_FORMAT")
      return e?.message ?? "Invalid format";
    if (e?.code === 2000 || e?.type === "WALLET_LOCKED")
      return e?.message ?? "Adena is locked";
    if (e?.code === 1001 || e?.type === "UNRESOLVED_TRANSACTION_EXISTS")
      return e?.message ?? "Resolve previous Adena popup";
    if (e?.code === 4000 || e?.type?.endsWith("_REJECTED"))
      return e?.message ?? "User rejected";
    if (e?.code === 4001 || e?.type === "TRANSACTION_FAILED")
      return e?.message ?? "Transaction failed";
    return e?.message ?? "Unknown Adena error";
  };

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
    } catch (err) {
      console.error("wallet connection failed", err);
    }
  };

  const onGetAddress = () => {
    setIsAddressVisible(true);
  };

  const onGetBalance = async () => {
    if (!window.adena || !isReady) return;

    try {
      const account = await window.adena.GetAccount();
      setBalance(account.data.coins ?? "");
      setIsBalanceVisible(true);
    } catch (err) {
      console.error("get balance failed", err);
      setBalance("");
      setIsBalanceVisible(true);
    }
  };

  const onSend = async () => {
    if (!window.adena || !isReady) return;

    try {
      const tx = await window.adena.DoContract({
        messages: [
          {
            type: "/bank.MsgSend",
            value: {
              from_address: address,
              to_address: recipient.trim(),
              amount: amount.trim(),
            },
          },
        ],
        memo: "Send GNOT for assignment",
      });

      if (tx.status !== "success") {
        throw tx;
      }

      addToast({
        id: crypto.randomUUID(),
        status: TX_SUCCESS,
        txHash: tx.data?.hash ?? "-",
      });
    } catch (err) {
      addToast({
        id: crypto.randomUUID(),
        status: TX_FAILED,
        txHash: "-",
        errorMessage: getErrorMessage(err),
      });
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-10 text-center text-[24px] font-semibold">
        Request to Gno.land via Adena wallet
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Connect Adena Wallet">
          <Button enabled={!isConnected} onClick={onConnect} label="Connect" />
        </Card>
        <Card title="Get Gno.land Address">
          <Button
            enabled={isReady}
            onClick={onGetAddress}
            label="Get Address"
          />
          <p>Address: {isAddressVisible ? address : ""}</p>
        </Card>
        <Card title="Get Balance">
          <Button
            enabled={isReady}
            onClick={onGetBalance}
            label="Get Balance"
          />
          <p>Balance: {isBalanceVisible ? balanceUgnot || "0ugnot" : ""}</p>
        </Card>
        <Card title="Send GNOT">
          <Input
            label="Recipient:"
            placeholder="g1..."
            value={recipient}
            onChange={setRecipient}
          />
          <Input
            label="Amount:"
            placeholder="1000000ugnot"
            value={amount}
            onChange={setAmount}
          />
          <Button enabled={isReady} onClick={onSend} label="Send" />
        </Card>
      </div>
    </main>
  );
}
