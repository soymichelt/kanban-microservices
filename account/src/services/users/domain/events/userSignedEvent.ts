import { User } from '@services/users/domain/user';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type UserSignedEventPrimitives = BaseEventPrimitivesProps & {
  userId: string;
  username: string;
};

export class UserSignedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'user.signed';

  private readonly user: User;

  private constructor(user: User) {
    super({
      aggregateId: user.userId.toString(),
      eventType: UserSignedEvent.EVENT_NAME,
    });

    this.user = user;
  }

  public static build(user: User): UserSignedEvent {
    return new UserSignedEvent(user);
  }

  public toPrimitives(): UserSignedEventPrimitives {
    const userPrimitives = this.user.toPrimitives();

    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      userId: userPrimitives.userId,
      username: userPrimitives.username,
    };
  }
}
