import 'reflect-metadata';

import { EventBus } from '@shared/domain/events/eventBus';
import { HttpRequestParserController } from '@shared/infrastructure/controllers/httpRequestParserController';
import { ManagerRequestParsersController } from '@shared/infrastructure/controllers/managerRequestParsersController';
import { RequestParserController } from '@shared/infrastructure/controllers/requestParserController';
import { SnsRequestParserController } from '@shared/infrastructure/controllers/snsRequestParserController';
import { EventBusSns } from '@shared/infrastructure/events/eventBusSns';
import { container } from 'tsyringe';

container
  .register<RequestParserController>('RequestParserController', HttpRequestParserController)
  .register<RequestParserController>('RequestParserController', SnsRequestParserController)
  .register<ManagerRequestParsersController>('ManagerRequestParsersController', ManagerRequestParsersController)
  .register<EventBus>('EventBus', {
    useValue: new EventBusSns({
      serviceName: `${process.env.APP}.${process.env.SERVICE}`,
      version: process.env.EVENT_BUS_VERSION,
      awsRegion: process.env.REGION,
      topicArn: process.env.SNS_TOPIC_ARN,
    }),
  });

export { container };
