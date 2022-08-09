import { createRoot } from "react-dom/client";

import Router from "./router";
import WalletProvider from "./apis/Wallet";
import BackgroundConnectorProvider from "./connectors/BackgroundConnector";

let container = document.getElementById("root");
if (!container) {
  container = document.createElement("div");
  document.body.appendChild(container);
}

const root = createRoot(container);

root.render(
  <div className="viewport bg-bg-grey">
    <BackgroundConnectorProvider>
      <WalletProvider>
        <Router />
      </WalletProvider>
    </BackgroundConnectorProvider>
  </div>
);
