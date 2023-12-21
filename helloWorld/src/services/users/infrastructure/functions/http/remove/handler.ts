import { container } from '@di/services/users';
import middy from '@middy/core';
import { RemoveUserController } from '@services/users/infrastructure/functions/http/remove/controller';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyEventV2, context: Context) {
  const controller = container.resolve<RemoveUserController>('RemoveUserController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
