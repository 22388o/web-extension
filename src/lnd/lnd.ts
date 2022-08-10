import LightningNodeConnect, { CredentialStore } from "@lightninglabs/lnc-web";
import {
  createTestCipher,
  decrypt,
  encrypt,
  generateSalt,
  verifyTestCipher,
} from "./encryption";

const STORAGE_KEY = "lnc-web";

class Storage implements CredentialStore {
  // data stored in web extension storage
  private persisted = {
    salt: "",
    cipher: "",
    serverHost: "",

    // encrypted fields
    localKey: "",
    remoteKey: "",
    pairingPhrase: "",
  };

  private _password?: string;
  private _pairingPhrase = "";

  private _localKey = "";
  private _remoteKey = "";

  private namespace = "fusewallet";

  constructor(password?: string) {
    this._password = password;
    this._load();
  }

  get password() {
    return this._password || "";
  }

  set password(password: string) {
    if (this.persisted.cipher) {
      const { cipher, salt } = this.persisted;
      if (!verifyTestCipher(cipher, password, salt)) {
        throw new Error("the provided password is not correct");
      }

      // Set password prior to decrypted data
      this._password = password;

      // Decrypt data
      this._pairingPhrase = this._decrypt(this.persisted.pairingPhrase);
      this._localKey = this._decrypt(this.persisted.localKey);
      this._remoteKey = this._decrypt(this.persisted.remoteKey);
    } else {
      // Plain text data will be encrypted
      this._password = password;

      this.persisted.salt = generateSalt();
      this.persisted.cipher = createTestCipher(password, this.persisted.salt);

      // encrypt and persist any in-memory values
      if (this.pairingPhrase)
        this.persisted.pairingPhrase = this._encrypt(this.pairingPhrase);
      if (this.localKey) this.persisted.localKey = this._encrypt(this.localKey);
      if (this.remoteKey)
        this.persisted.remoteKey = this._encrypt(this.remoteKey);
      this._save();
    }
  }

  get serverHost() {
    return this.persisted.serverHost;
  }

  set serverHost(host: string) {
    this.persisted.serverHost = host;
    this._save();
  }

  get pairingPhrase() {
    return this._pairingPhrase;
  }

  set pairingPhrase(phrase: string) {
    this._pairingPhrase = phrase;
    if (this._password) {
      this.persisted.pairingPhrase = this._encrypt(phrase);
      this._save();
    }
  }

  get localKey() {
    return this._localKey;
  }

  set localKey(key: string) {
    this._localKey = key;
    if (this._password) {
      this.persisted.localKey = this._encrypt(key);
      this._save();
    }
  }

  get remoteKey() {
    return this._remoteKey;
  }

  set remoteKey(key: string) {
    this._remoteKey = key;
    if (this._password) {
      this.persisted.remoteKey = this._encrypt(key);
      this._save();
    }
  }

  get isPaired() {
    return !!this.persisted.remoteKey || !!this.persisted.pairingPhrase;
  }

  clear() {
    const key = `${STORAGE_KEY}:${this.namespace}`;
    chrome.storage.local.remove(key);

    this.persisted = {
      salt: "",
      cipher: "",
      serverHost: this.persisted.serverHost,
      localKey: "",
      remoteKey: "",
      pairingPhrase: "",
    };
    this._localKey = "";
    this._remoteKey = "";
    this._pairingPhrase = "";
    this._password = undefined;
  }

  private async _load() {
    try {
      const key = `${STORAGE_KEY}:${this.namespace}`;
      const result = await chrome.storage.local.get(key);
      if (!result[key]) return;
      this.persisted = JSON.parse(result[key]);
    } catch (error) {
      throw new Error(
        `Failed to load secure data: ${(error as Error).message}`
      );
    }
  }

  private _save() {
    const key = `${STORAGE_KEY}:${this.namespace}`;
    return chrome.storage.local.set({ [key]: JSON.stringify(this.persisted) });
  }

  private _encrypt(value: string) {
    if (!value || !this._password) return "";
    return encrypt(value, this._password, this.persisted.salt);
  }

  private _decrypt(value: string) {
    if (!value || !this._password) return "";
    return decrypt(value, this._password, this.persisted.salt);
  }
}

class LND {
  private lnc = new LightningNodeConnect({ credentialStore: new Storage() });

  connect(phrase: string, password: string) {
    this.lnc.credentials.pairingPhrase = phrase;
    this.lnc.credentials.password = password;
    return this.lnc.connect().catch((err) => console.log(err));
  }

  login(password: string) {
    this.lnc.credentials.password = password;
    return this.lnc.connect();
  }

  client() {
    return this.lnc.lnd;
  }
}

export default LND;
