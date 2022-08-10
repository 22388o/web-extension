import Browser from "webextension-polyfill";
import LND from "../lnd/lnd";

import Targets from "./Targets";
import { Message } from "./types/Streams";

const lnd = new LND();

export enum LightningAPI {
  Connect = "connect",
  Login = "connect",
  GetBalance = "balance",
}

export type ConnectRequest = {
  phrase: string;
  password: string;
};

export type LoginRequest = {
  password: string;
};

export default class Lightning {
  target = Targets.Lightning;

  constructor() {
    this.listen();
  }

  private listen() {
    Browser.runtime.onConnect.addListener((port) => {
      port.onMessage.addListener((message: Message) => {
        if (message.target !== this.target) return;

        // @ts-ignore: Testing against class fns
        const fn = this[message.method];
        if (!fn) return;

        fn(message.data)
          .then((data: Record<string, unknown>) => {
            port.postMessage({ id: message.id, data });
          })
          .catch((error: Error) => {
            port.postMessage({ id: message.id, error });
          });
      });
    });
  }

  async connect(data: ConnectRequest) {
    console.log("data: ", data);
    return lnd.connect(data.phrase, data.password);
  }

  async login(data: LoginRequest) {
    return lnd.login(data.password);
  }

  async balance() {
    return lnd
      .client()
      .lightning.walletBalance()
      .then((resp) => {
        return parseInt(resp.confirmedBalance, 10);
      });
  }
}
