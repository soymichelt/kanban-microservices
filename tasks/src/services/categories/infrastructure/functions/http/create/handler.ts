import { container } from '@di/services/categories';
import middy from '@middy/core';
import { CreateCategoryController } from '@services/categories/infrastructure/functions/http/create/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<CreateCategoryController>('CreateCategoryController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
