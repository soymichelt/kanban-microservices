import { BaseEvent, BaseEventPrimitivesProps, BaseEventProps } from '@shared/domain/events/baseEvent';

export type IntegrationEventProps = BaseEventProps;

export type IntegrationEventPrimitivesProps = BaseEventPrimitivesProps;

export abstract class IntegrationEvent extends BaseEvent {}
