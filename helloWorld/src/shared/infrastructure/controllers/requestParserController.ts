/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'aws-lambda';

export interface RequestParserController {
  match(event: any, context: Context): boolean;
  parseRequest<T>(event: any, context: Context): T;
}
