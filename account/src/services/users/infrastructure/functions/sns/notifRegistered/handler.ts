import { container } from '@di/services/users';
import middy from '@middy/core';
import { Context, SNSEvent } from 'aws-lambda';

import { NotifyUserRegisteredController } from './controller';

const invokeController = async function (event: SNSEvent, context: Context) {
  const controller = container.resolve<NotifyUserRegisteredController>('NotifyUserRegisteredController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
