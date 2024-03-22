import { DomainEvent } from './domain-event';
import { UuidValueObject } from './value-object';

export class AggregateRoot {
  id!: UuidValueObject;
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  public record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = [...this.domainEvents];
    this.domainEvents = [];

    return domainEvents;
  }
}
