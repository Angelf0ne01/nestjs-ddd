import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@shared/clients/rabbitmq/event-bus';
import { BookId, BookTitle } from '@shared/entities/book/domain/value-object';
import { Book } from '../domain/book';
import { BookRepository } from '../domain/book.repository';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class BookCreateService {
  constructor(
    @Inject('event-bus') private eventBus: EventBus,
    @Inject('repository') private repository: BookRepository,
  ) {}

  public async run(
    id: string,
    title: string,
  ): Promise<void> {
    const book = Book.create(new BookId(id), new BookTitle(title));
    await this.repository.save(book);
    this.eventBus.publishs(book.pullDomainEvents());
  }
}
