import { container } from '@di/services/categories';
import middy from '@middy/core';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

import { GetAllCategoriesController } from './controller';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<GetAllCategoriesController>('GetAllCategoriesController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
