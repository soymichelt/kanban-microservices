import { BaseEvent, BaseEventPrimitivesProps, BaseEventProps } from '@shared/domain/events/baseEvent';

export type DomainEventProps = BaseEventProps;

export type DomainEventPrimitivesProps = BaseEventPrimitivesProps;

export abstract class DomainEvent extends BaseEvent {}
