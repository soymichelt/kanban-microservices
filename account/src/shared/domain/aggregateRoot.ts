/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainEvent } from '@shared/domain/events/domainEvent';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';

export abstract class AggregateRoot {
  public createdAt: DateValueObject;
  public updatedAt: DateValueObject;

  private events: DomainEvent[];

  constructor() {
    if (!this.createdAt) this.createdAt = DateValueObject.now();
    if (!this.updatedAt) this.updatedAt = DateValueObject.now();

    this.events = [];
  }

  public pushEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  public pullEvents(): DomainEvent[] {
    const prevEvents = [...this.events];
    this.events = [];

    return prevEvents;
  }

  public abstract toPrimitives(): any;
}
