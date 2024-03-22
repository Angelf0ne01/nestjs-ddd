import { DomainEvent } from '@shared/common/domain/domain-event';
import { BookPrimitive } from '../book';

export class BookUpdateEvent extends DomainEvent {
  static readonly EVENT_NAME: string =
    'company.skeleton_service.1.event.book.updated';
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
      eventName: BookUpdateEvent.EVENT_NAME,
      aggregateId: id,
      occurredOn: new Date(),
    });
  }
}
