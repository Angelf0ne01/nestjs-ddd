import { DomainEvent } from '@shared/common/domain/domain-event';
import { BookPrimitive } from '../book';

export class BookCreateEvent extends DomainEvent {
  static readonly EVENT_NAME: string =
    'company.skeleton_service.1.event.book.created';
  toPrimitives(): BookPrimitive {
    return {
      id: this.id,
      title: this.title,
    };
  }
  constructor(
    readonly id: string,
    readonly title: string,
  ) {
    super({
      eventName: BookCreateEvent.EVENT_NAME,
      aggregateId: id,
      occurredOn: new Date(),
    });
  }
}
