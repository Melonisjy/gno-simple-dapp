function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-10 text-center text-[24px] font-semibold">
        Request to Gno.land via Adena wallet
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-md border border-gray-300 bg-white">
          <div className="bg-[#f2f2f6] px-4 py-2 text-[20px]">
            Connect Adena Wallet
          </div>
          <div className="space-y-4 p-4 text-[16px]">
            <button className="h-11 w-full rounded-md bg-[#2c4be2] text-[16px] text-white">
              Connect
            </button>
          </div>
        </section>

        <section className="rounded-md border border-gray-300 bg-white">
          <div className="bg-[#f2f2f6] px-4 py-2 text-[20px]">
            Get Gno.land Address
          </div>
          <div className="space-y-4 p-4 text-[16px]">
            <button className="h-11 w-full rounded-md bg-[#808080] text-[16px] text-white">
              Get Address
            </button>
            <p>Address:</p>
          </div>
        </section>

        <section className="rounded-md border border-gray-300 bg-white">
          <div className="bg-[#f2f2f6] px-4 py-2 text-[20px]">Get Balance</div>
          <div className="space-y-4 p-4 text-[16px]">
            <button className="h-11 w-full rounded-md bg-[#808080] text-[16px] text-white">
              Get Balance
            </button>
            <p>Balance:</p>
          </div>
        </section>

        <section className="rounded-md border border-gray-300 bg-white">
          <div className="bg-[#f2f2f6] px-4 py-2 text-[20px]">Send GNOT</div>
          <div className="space-y-4 p-4 text-[16px]">
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
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
