import { v4 as uuid } from 'uuid';

export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: DomainEventAttributes;
  }) => DomainEvent;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;
  readonly metadata?: Record<string, number | string | boolean>;

  protected constructor(params: {
    eventName: string;
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    metadata?: Record<string, number | string | boolean>;
  }) {
    const { aggregateId, eventName, eventId, occurredOn, metadata } = params;
    this.aggregateId = aggregateId;
    this.eventId = eventId || uuid();
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
    this.metadata = metadata;
  }

  abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: DomainEventAttributes;
  }): DomainEvent;
};

type DomainEventAttributes = unknown;
