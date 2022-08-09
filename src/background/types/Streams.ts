export type Message<T = any> = {
  id: string;
  target: string;
  method: string;
  data: T;
};

export type Response<T = any> = {
  id: string;
  data?: any;
  error?: Error;
};
