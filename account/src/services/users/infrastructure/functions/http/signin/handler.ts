import { container } from '@di/services/users';
import middy from '@middy/core';
import { SigninController } from '@services/users/infrastructure/functions/http/signin/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<SigninController>('SigninController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
