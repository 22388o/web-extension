import { AES, enc } from "crypto-js";

const TEST_DATA = "Irrelevant data for password verification";

const validChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateSalt = () => {
  let array = new Uint8Array(32);
  crypto.getRandomValues(array);
  array = array.map((x) => validChars.charCodeAt(x % validChars.length));
  return String.fromCharCode.apply(null, array as any);
};

export const encrypt = (data: any, password: string, salt: string) =>
  AES.encrypt(JSON.stringify(data), password + salt).toString();

export const decrypt = (data: any, password: string, salt: string) => {
  const decrypted = AES.decrypt(data, password + salt);
  return JSON.parse(decrypted.toString(enc.Utf8));
};

export const createTestCipher = (password: string, salt: string) =>
  encrypt(TEST_DATA, password, salt);

export const verifyTestCipher = (
  test: string,
  password: string,
  salt: string
) => {
  try {
    const decrypted = decrypt(test, password, salt);
    return decrypted === TEST_DATA;
  } catch {
    return false;
  }
};
