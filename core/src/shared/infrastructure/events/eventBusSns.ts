import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { DomainEvent } from '@shared/domain/events/domainEvent';
import { EventBus } from '@shared/domain/events/eventBus';
import { IntegrationEvent } from '@shared/domain/events/integrationEvent';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';

type EventBusSnsProps = {
  serviceName: string;
  version: string;
  awsRegion: string;
  topicArn: string;
};

export class EventBusSns implements EventBus {
  serviceName: string;
  version: string;
  awsRegion: string;
  topicArn: string;

  constructor(props: EventBusSnsProps) {
    this.validateEventBus(props);

    this.serviceName = props.serviceName;
    this.version = props.version;
    this.awsRegion = props.awsRegion;
    this.topicArn = props.topicArn;
  }

  public async publish(events: DomainEvent | IntegrationEvent | DomainEvent[] | IntegrationEvent[]): Promise<void> {
    if (!Array.isArray(events)) {
      await this.sendSnsMessage(events);
    }

    const promises = (events as (DomainEvent | IntegrationEvent)[]).map((event) => this.sendSnsMessage(event));
    await Promise.all(promises);
  }

  private async sendSnsMessage(event: DomainEvent | IntegrationEvent): Promise<void> {
    const messageParams = {
      TopicArn: this.topicArn,
      Message: JSON.stringify(event.toPrimitives()),
      MessageAttributes: {
        event_type: {
          DataType: 'String',
          StringValue: `${this.serviceName}.${this.version}.${event.eventType}`,
        },
      },
    };

    const client = new SNSClient();
    const command = new PublishCommand(messageParams);
    await client.send(command);
  }

  private validateEventBus(props: EventBusSnsProps): void {
    if (!props.serviceName || !props.version || !props.awsRegion || !props.topicArn) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      );
    }
  }
}
