import { Id } from '@shared/domain/valueObjects/id';

import { ArgRequiredException } from '../exceptions/argRequiredException';

export type BaseEventProps = {
  aggregateId: string;
  eventId?: string;
  eventType?: string;
  eventDate?: Date;
};

export type BaseEventPrimitivesProps = {
  aggregateId: string;
  eventId: string;
  eventType: string;
  eventDate: string;
};

export abstract class BaseEvent {
  public static EVENT_NAME: string;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly eventType: string;
  readonly eventDate: Date;

  constructor(props: BaseEventProps) {
    this.validateEvent(props);

    this.aggregateId = props.aggregateId;
    this.eventId = props.eventId ?? Id.newId().toString();
    this.eventType = props.eventType ?? BaseEvent.EVENT_NAME;
    this.eventDate = props.eventDate ?? new Date();
  }

  private validateEvent(props: BaseEventProps): void {
    const { aggregateId, eventType } = props;
    if (!aggregateId || !eventType) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      );
    }
  }

  public abstract toPrimitives(): BaseEventPrimitivesProps;
}
