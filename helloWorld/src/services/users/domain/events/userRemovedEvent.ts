import { User } from '@services/users/domain/user';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type UserRemovedEventPrimitives = BaseEventPrimitivesProps & {
  userId: string;
  email: string;
  username: string;
};

export class UserRemovedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'user.removed';

  private readonly user: User;

  private constructor(user: User) {
    super({
      aggregateId: user.userId.toString(),
      eventType: UserRemovedEvent.EVENT_NAME,
    });

    this.user = user;
  }

  public static build(user: User): UserRemovedEvent {
    return new UserRemovedEvent(user);
  }

  public toPrimitives(): UserRemovedEventPrimitives {
    const userPrimitives = this.user.toPrimitives();

    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      userId: userPrimitives.userId,
      email: userPrimitives.email,
      username: userPrimitives.username,
    };
  }
}
