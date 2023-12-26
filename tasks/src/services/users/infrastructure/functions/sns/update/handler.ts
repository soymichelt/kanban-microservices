import { container } from '@di/services/users';
import middy from '@middy/core';
import { UpdateUserController } from '@services/users/infrastructure/functions/sns/update/controller';
import { Context, SNSEvent } from 'aws-lambda';

const invokeController = async function (event: SNSEvent, context: Context) {
  const controller = container.resolve<UpdateUserController>('UpdateUserController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
