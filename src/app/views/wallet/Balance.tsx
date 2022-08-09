export default function Balance() {
  return (
    <div className="balance flex flex-col items-center gap-2">
      <div className="balance-label text-xs text-slate-500 uppercase">
        Current Wallet Value
      </div>
      <div className="balance-value text-4xl text-white">5000 sats</div>
    </div>
  );
}
