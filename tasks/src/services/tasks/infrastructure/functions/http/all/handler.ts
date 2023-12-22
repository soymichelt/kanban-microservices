import { container } from '@di/services/tasks';
import middy from '@middy/core';
import { AllTasksController } from '@services/tasks/infrastructure/functions/http/all/controller';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyEventV2, context: Context) {
  const controller = container.resolve<AllTasksController>('AllTasksController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
