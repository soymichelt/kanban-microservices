import { container } from '@di/services/tasks';
import middy from '@middy/core';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

import { CreateTaskController } from './controller';

const invokeController = async function (event: APIGatewayProxyEventV2, context: Context) {
  const controller = container.resolve<CreateTaskController>('CreateTaskController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
