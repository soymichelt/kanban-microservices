import { container } from '@di/services/users';
import middy from '@middy/core';
import { DeleteUserController } from '@services/users/infrastructure/functions/sns/delete/controller';
import { Context, SNSEvent } from 'aws-lambda';

const invokeController = async function (event: SNSEvent, context: Context) {
  const controller = container.resolve<DeleteUserController>('DeleteUserController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
