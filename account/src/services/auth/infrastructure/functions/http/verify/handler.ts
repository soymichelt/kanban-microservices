import { container } from '@di/services/auth';
import middy from '@middy/core';
import { VerifyIfAuthorizedController } from '@services/auth/infrastructure/functions/http/verify/controller';
import { APIGatewayRequestAuthorizerEvent, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayRequestAuthorizerEvent, context: Context) {
  const controller = container.resolve<VerifyIfAuthorizedController>('VerifyIfAuthorizedController');
  const result = await controller.execute(event, context);
  return result;
};

export const handler = middy(invokeController);
