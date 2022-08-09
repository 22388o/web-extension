import { createContext, useContext, useState, PropsWithChildren } from "react";
import {
  LightningAPI,
  ConnectRequest,
  LoginRequest,
} from "../../background/Lightning";
import Targets from "../../background/Targets";
import { useBackgroundConnector } from "../connectors/BackgroundConnector";

type Balance = {
  satoshis: number;
};

type ConnectFN = (phrase: string, password: string) => Promise<void>;
type LoginFN = (password: string) => Promise<void>;
type BalanceFN = () => Promise<Balance>;

interface Wallet {
  connected: boolean;
  connect: ConnectFN;
  login: LoginFN;
  balance: BalanceFN;
}

const ErrContextNotConfigured = new Error("context not configured");

const WalletContext = createContext<Wallet>({
  connected: false,
  connect: () => Promise.reject(ErrContextNotConfigured),
  login: () => Promise.reject(ErrContextNotConfigured),
  balance: () => Promise.resolve({ satoshis: 0 }),
});

export function useWallet() {
  return useContext(WalletContext);
}

export default function WalletProvider(props: PropsWithChildren<{}>) {
  const [connected, setConnected] = useState(false);

  const connector = useBackgroundConnector();

  const connect: ConnectFN = (phrase, password) => {
    const req: ConnectRequest = { phrase, password };
    return connector
      .send(Targets.Lightning, LightningAPI.Connect, req)
      .then(() => {
        setConnected(true);
      });
  };

  const login: LoginFN = (password) => {
    const req: LoginRequest = { password };
    return connector
      .send(Targets.Lightning, LightningAPI.Login, req)
      .then(() => {
        setConnected(true);
      });
  };

  const balance: BalanceFN = () => {
    return connector.send(Targets.Lightning, LightningAPI.GetBalance);
  };

  return (
    <WalletContext.Provider value={{ connected, connect, login, balance }}>
      {props.children}
    </WalletContext.Provider>
  );
}
