import { container } from '@di/services/ping';
import middy from '@middy/core';
import { GetHealthCheckController } from '@services/ping/infrastructure/functions/http/get/controller';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyEventV2, context: Context) {
  const controller = container.resolve<GetHealthCheckController>('GetHealthCheckController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
