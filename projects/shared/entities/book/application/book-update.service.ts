import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@shared/clients/rabbitmq/event-bus';
import { BookTitle } from '@shared/entities/book/domain/value-object';
import { BookRepository } from '../domain/book.repository';
import { BookFindByIdService } from './book-find-by-id.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class BookUpdateService {
  constructor(
    @Inject('event-bus') private eventBus: EventBus,
    @Inject('repository') private repository: BookRepository,
    private bookFindByIdService: BookFindByIdService,
  ) {}

  public async run(id: string, title: string): Promise<void> {
    const existingBook = await this.bookFindByIdService.run(id);
    const book = existingBook.update(new BookTitle(title));
    await this.repository.update(book);
    this.eventBus.publishs(book.pullDomainEvents());
  }
}
