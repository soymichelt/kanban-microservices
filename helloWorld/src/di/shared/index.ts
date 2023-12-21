import 'reflect-metadata';

import { EventBus } from '@shared/domain/events/eventBus';
import { Logger } from '@shared/domain/loggers/logger';
import { EncriptionService } from '@shared/domain/services/encriptionService';
import { KeyStoreService } from '@shared/domain/services/keyStoreService';
import { MailingService } from '@shared/domain/services/mailingService';
import { SmsService } from '@shared/domain/services/smsService';
import { AuthorizerRequestParserController } from '@shared/infrastructure/controllers/authorizerRequestParserController';
import { HttpRequestParserController } from '@shared/infrastructure/controllers/httpRequestParserController';
import { ManagerRequestParsersController } from '@shared/infrastructure/controllers/managerRequestParsersController';
import { RequestParserController } from '@shared/infrastructure/controllers/requestParserController';
import { SnsRequestParserController } from '@shared/infrastructure/controllers/snsRequestParserController';
import { EventBusSns } from '@shared/infrastructure/events/eventBusSns';
import { WinstonLogger } from '@shared/infrastructure/loggers/winston/winstonLogger';
import { MongoClientFactory } from '@shared/infrastructure/persistence/mongodb/mongoClientFactory';
import { CryptoEncriptionService } from '@shared/infrastructure/services/encription/cryptoEncriptionService';
import { SsmKeyStoreService } from '@shared/infrastructure/services/keyStore/ssmKeyStoreService';
import { SesMailingService } from '@shared/infrastructure/services/mailing/sesMailingService';
import { SnsSmsService } from '@shared/infrastructure/services/sms/SnsSmsService';
import { container } from 'tsyringe';

container
  .register<RequestParserController>('RequestParserController', HttpRequestParserController)
  .register<RequestParserController>('RequestParserController', AuthorizerRequestParserController)
  .register<RequestParserController>('RequestParserController', SnsRequestParserController)
  .register<ManagerRequestParsersController>('ManagerRequestParsersController', ManagerRequestParsersController)
  .register<Logger>('Logger', {
    useValue: new WinstonLogger({
      app: process.env.APP,
      service: process.env.SERVICE,
      package: process.env.PACKAGE,
      awsRegion: process.env.REGION,
      stage: process.env.STAGE,
      version: process.env.VERSION,
    }),
  })
  .register<KeyStoreService>('KeyStoreService', {
    useValue: new SsmKeyStoreService({
      awsRegion: process.env.REGION,
    }),
  });

if (process.env.SNS_TOPIC_ARN) {
  container.register<EventBus>('EventBus', {
    useValue: new EventBusSns({
      serviceName: `${process.env.APP}.${process.env.SERVICE}`,
      version: process.env.EVENT_BUS_VERSION,
      awsRegion: process.env.REGION,
      topicArn: process.env.SNS_TOPIC_ARN,
    }),
  });
}

if (process.env.MONGO_DATABASE_URI && process.env.MONGO_DATABASE_NAME) {
  container.register<MongoClientFactory>('MongoClientFactory', {
    useValue: MongoClientFactory.build({
      uri: process.env.MONGO_DATABASE_URI,
      databaseName: process.env.MONGO_DATABASE_NAME,
    }),
  });
}

if (process.env.CRYPTO_SECRET_KEY && process.env.CRYPTO_SECRET_IV) {
  container.register<EncriptionService>('EncriptionService', {
    useValue: new CryptoEncriptionService({
      secretKey: String(process.env.CRYPTO_SECRET_KEY),
      secretIV: String(process.env.CRYPTO_SECRET_IV),
    }),
  });
}

if (process.env.SES_EMAIL_FROM) {
  container.register<MailingService>('MailingService', {
    useValue: new SesMailingService({
      awsRegion: process.env.REGION,
      emailFrom: process.env.SES_EMAIL_FROM,
    }),
  });
}

if (process.env.SMS_SENDER) {
  container.register<SmsService>('SmsService', {
    useValue: new SnsSmsService({
      awsRegion: process.env.REGION,
      sender: process.env.SMS_SENDER,
    }),
  });
}

export { container };
