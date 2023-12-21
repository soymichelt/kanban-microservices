import { ArgRequiredException } from '../exceptions/argRequiredException';

export type BaseEventProps = {
  aggregateId: string;
  eventId: string;
  eventType: string;
  eventDate?: Date;
  eventName?: string;
};

export type BaseEventPrimitivesProps = {
  aggregateId: string;
  eventId: string;
  eventType: string;
  eventDate: string;
  eventName: string;
};

export abstract class BaseEvent {
  public static EVENT_NAME: string;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly eventType: string;
  readonly eventDate: Date;
  readonly eventName: string;

  constructor(props: BaseEventProps) {
    this.validateEvent(props);

    this.aggregateId = props.aggregateId;
    this.eventId = props.eventId;
    this.eventType = props.eventType;
    this.eventDate = props.eventDate ?? new Date();
    this.eventName = props.eventName;
  }

  private validateEvent(props: BaseEventProps): void {
    const { aggregateId, eventId, eventName } = props;
    if (!aggregateId || !eventId || !eventName) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      );
    }
  }

  public abstract toPrimitives(): BaseEventPrimitivesProps;
}
