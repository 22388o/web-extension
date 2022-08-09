import { useState, useEffect } from "react";

import Actions from "./Actions";
import Balance from "./Balance";

export default function Wallet() {
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "fuse-wallet" });
    port.onMessage.addListener((msg) => console.log(msg));
    setPort(port);
  }, []);

  return (
    <div className="wallet pt-16">
      <Balance />
      <div className="my-8">
        <Actions />
      </div>
      <div
        className="separator"
        style={{
          width: "100%",
          height: 4,
          border: "1px solid rgba(23, 24, 26,1",
          backgroundColor: "rgba(49, 52, 54,1)",
        }}
      />
    </div>
  );
}
