// component
import Card from "../components/Card";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-10 text-center text-[24px] font-semibold">
        Request to Gno.land via Adena wallet
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Connect Adena Wallet">
          <button className="h-11 w-full rounded-md bg-[#2c4be2] text-[16px] text-white">
            Connect
          </button>
        </Card>
        <Card title="Get Gno.land Address">
          <button className="h-11 w-full rounded-md bg-[#808080] text-[16px] text-white">
            Get Address
          </button>
          <p>Address:</p>
        </Card>
        <Card title="Get Balance">
          <button className="h-11 w-full rounded-md bg-[#808080] text-[16px] text-white">
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
          <button className="h-11 w-full rounded-md bg-[#808080] text-[16px] text-white">
            Send
          </button>
        </Card>
      </div>
    </main>
  );
}
