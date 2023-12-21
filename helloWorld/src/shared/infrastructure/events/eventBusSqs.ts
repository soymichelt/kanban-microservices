import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { DomainEvent } from '@shared/domain/events/domainEvent';
import { EventBus } from '@shared/domain/events/eventBus';
import { IntegrationEvent } from '@shared/domain/events/integrationEvent';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';

type EventBusSqsProps = {
  serviceName: string;
  version: string;
  awsRegion: string;
  queueUrl: string;
  delaySeconds?: number;
};

export class EventBusSqs implements EventBus {
  private serviceName: string;
  private version: string;
  private awsRegion: string;
  private queueUrl: string;
  private delaySeconds: number;

  constructor(props: EventBusSqsProps) {
    this.validateEventBus(props);

    this.serviceName = props.serviceName;
    this.version = props.version;
    this.awsRegion = props.awsRegion;
    this.queueUrl = props.queueUrl;
    this.delaySeconds = props.delaySeconds ?? 0;
  }

  public async publish(events: DomainEvent | IntegrationEvent | DomainEvent[] | IntegrationEvent[]): Promise<void> {
    if (!Array.isArray(events)) {
      await this.sendSqsMessage(events);
    }

    const promises = (events as (DomainEvent | IntegrationEvent)[]).map((event) => this.sendSqsMessage(event));
    await Promise.all(promises);
  }

  private async sendSqsMessage(event: DomainEvent | IntegrationEvent): Promise<void> {
    const messageParams = {
      QueueUrl: this.queueUrl,
      DelaySeconds: this.delaySeconds,
      MessageAttributes: {
        event_type: {
          DataType: 'String',
          StringValue: `${this.serviceName}.${this.version}.${event.eventType}`,
        },
      },
      MessageBody: JSON.stringify(event.toPrimitives()),
    };

    const client = new SQSClient({ region: this.awsRegion });
    const command = new SendMessageCommand(messageParams);
    await client.send(command);
  }

  private validateEventBus(props: EventBusSqsProps): void {
    if (!props.serviceName || !props.version || !props.awsRegion || !props.queueUrl) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([key, value]) => !value && key !== 'delaySeconds')
          .map(([key]) => key),
      );
    }
  }
}
