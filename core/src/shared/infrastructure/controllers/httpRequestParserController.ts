/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestParserController } from '@shared/infrastructure/controllers/requestParserController';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { injectable } from 'tsyringe';

@injectable()
export class HttpRequestParserController implements RequestParserController {
  public match(event: APIGatewayProxyEventV2, _context: Context): boolean {
    return !!(event.requestContext?.http?.method && !(event as any).routeArn);
  }

  public parseRequest<T>(event: APIGatewayProxyEventV2, _context: Context): T {
    return {
      headers: event.headers,
      cookies: event.cookies || [],
      ...JSON.parse(event.body || '{}'),
      ...(event.queryStringParameters || {}),
      ...(event.pathParameters || {}),
    } as T;
  }
}
