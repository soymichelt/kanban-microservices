import { UserAuth } from '@services/auth/domain/auth';
import { UserRoleVerificationType } from '@services/auth/domain/valueObjects/userRoleVerification';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type UserAuthVerifiedEventPrimitives = BaseEventPrimitivesProps & {
  userId: string;
  verificationType: string;
};

export class UserAuthVerifiedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'auth.verified';

  private readonly auth: UserAuth;
  private readonly verificationType: UserRoleVerificationType;

  private constructor(auth: UserAuth, verificationType: UserRoleVerificationType) {
    super({
      aggregateId: auth.userId.toString(),
      eventType: UserAuthVerifiedEvent.EVENT_NAME,
    });

    this.auth = auth;
    this.verificationType = verificationType;
  }

  public static build(auth: UserAuth, verificationType: UserRoleVerificationType): UserAuthVerifiedEvent {
    return new UserAuthVerifiedEvent(auth, verificationType);
  }

  public toPrimitives(): UserAuthVerifiedEventPrimitives {
    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      userId: this.auth.userId.toString(),
      verificationType: this.verificationType.value,
    };
  }
}
