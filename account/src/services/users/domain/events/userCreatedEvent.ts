import { User } from '@services/users/domain/user';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type UserCreatedEventPrimitives = BaseEventPrimitivesProps & {
  userId: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export class UserCreatedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'user.created';

  private readonly user: User;

  private constructor(user: User) {
    super({
      aggregateId: user.userId.toString(),
      eventType: UserCreatedEvent.EVENT_NAME,
    });

    this.user = user;
  }

  public static build(user: User): UserCreatedEvent {
    return new UserCreatedEvent(user);
  }

  public toPrimitives(): UserCreatedEventPrimitives {
    const userPrimitives = this.user.toPrimitives();

    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      userId: userPrimitives.userId,
      username: userPrimitives.username,
      email: userPrimitives.email,
      createdAt: userPrimitives.createdAt,
      updatedAt: userPrimitives.updatedAt,
    };
  }
}
