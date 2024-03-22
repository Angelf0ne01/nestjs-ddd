/* eslint-disable @typescript-eslint/no-explicit-any */
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { DomaintEvent } from '@shared/clients/rabbitmq/domain-events';
import { ListenerBookCreate } from '@shared/entities/book/application/listeners/listener-book-created.service';
import { BookPrimitive } from '@shared/entities/book/domain/book';
import { BookCreateEvent } from '@shared/entities/book/domain/events/book-create.event';

@Injectable()
export class BookCreatedWorkerService {
  constructor(private listenerBookCreate: ListenerBookCreate) {}

  @RabbitSubscribe({
    exchange: 'skeleton_service.events',
    routingKey: BookCreateEvent.EVENT_NAME,
    queue: 'book_created_on_log_event',
  })
  public async run(event: DomaintEvent<BookPrimitive>) {
    // eslint-disable-next-line no-console
    await this.listenerBookCreate.run(event);
  }
}
