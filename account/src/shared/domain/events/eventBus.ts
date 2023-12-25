import { DomainEvent } from '@shared/domain/events/domainEvent';
import { IntegrationEvent } from '@shared/domain/events/integrationEvent';

export interface EventBus {
  publish(events: DomainEvent | IntegrationEvent | DomainEvent[] | IntegrationEvent[]): Promise<void>;
}
