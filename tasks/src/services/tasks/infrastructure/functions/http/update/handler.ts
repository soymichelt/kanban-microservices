import { container } from '@di/services/tasks';
import middy from '@middy/core';
import { UpdateTaskController } from '@services/tasks/infrastructure/functions/http/update/controller';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyEventV2, context: Context) {
  const controller = container.resolve<UpdateTaskController>('UpdateTaskController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
