import { container } from '@di/services/users';
import middy from '@middy/core';
import { GetAllUsersController } from '@services/users/infrastructure/functions/http/getAll/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<GetAllUsersController>('GetAllUsersController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
