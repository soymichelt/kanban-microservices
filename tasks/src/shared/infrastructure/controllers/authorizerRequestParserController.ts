import { RequestParserController } from '@shared/infrastructure/controllers/requestParserController';
import { APIGatewayRequestAuthorizerEventV2, Context } from 'aws-lambda';

export class AuthorizerRequestParserController implements RequestParserController {
  public match(event: APIGatewayRequestAuthorizerEventV2, _context: Context): boolean {
    return !!event.routeArn && event.version === '2.0';
  }

  public parseRequest<T>(event: APIGatewayRequestAuthorizerEventV2, _context: Context): T {
    return {
      routeArn: event.routeArn,
      headers: event.headers,
      cookies: event.cookies || [],
      identitySource: event.identitySource || [],
      ...(event.queryStringParameters || {}),
      ...(event.pathParameters || {}),
    } as T;
  }
}
