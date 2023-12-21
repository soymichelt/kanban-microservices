/* eslint-disable @typescript-eslint/no-explicit-any */
export type BaseResponseType = {
  [key: string]: any;

  statusCode: number;
  body: string;
};
