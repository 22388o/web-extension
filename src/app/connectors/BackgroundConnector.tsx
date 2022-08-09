import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  PropsWithChildren,
} from "react";
import { v4 as uuid } from "uuid";
import Browser from "webextension-polyfill";

import { Message, Response } from "../../background/types/Streams";

type SendFN = (target: string, method: string, data?: any) => Promise<any>;

interface BackgroundConnector {
  send: SendFN;
}

const Context = createContext<BackgroundConnector>({
  send: () => Promise.reject("Connector Not Configured"),
});

export function useBackgroundConnector() {
  return useContext(Context);
}

export default function BackgroundConnectorProvider(
  props: PropsWithChildren<{}>
) {
  const [tunnel, setTunnel] = useState<chrome.runtime.Port | null>(null);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "fusebtc:background" });
    setTunnel(port);
  }, []);

  const send: SendFN = (target, method, data) =>
    new Promise((resolve, reject) => {
      if (!tunnel)
        return reject(new Error("background script tunnel not created"));

      const id = uuid();

      const request: Message = { id, target, method, data };

      const handler = (msg: Response) => {
        if (msg.id !== request.id) return;
        if (msg.error) reject(msg.error);
        tunnel.onMessage.removeListener(handler);
        resolve(data);
      };

      tunnel.onMessage.addListener(handler);
      tunnel.postMessage(request);
    });

  return <Context.Provider value={{ send }}>{props.children}</Context.Provider>;
}
