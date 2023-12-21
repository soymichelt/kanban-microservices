import { container } from '@di/services/users';
import middy from '@middy/core';
import { Context, SNSEvent } from 'aws-lambda';

import { NotifyUserRemovedController } from './controller';

const invokeController = async function (event: SNSEvent, context: Context) {
  const controller = container.resolve<NotifyUserRemovedController>('NotifyUserRemovedController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
