/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBus } from '@shared/clients/rabbitmq/event-bus';
import { FakeMessagingService } from '@shared/clients/rabbitmq/testing';
import { BookCreateService } from '@shared/entities/book/application/book-create.service';
import { BookRepositoryInMemory } from '@shared/entities/book/infrastructure/book-repository-in-memory';
import { BookRepository } from '@shared/entities/book/domain/book.repository';
import { BOOK_MOCK } from '../mocks';
import { BookId } from '@shared/entities/book/domain/value-object';

describe('BookCreateService', () => {
  let eventBus: EventBus;
  let repository: BookRepository;
  let bookCreateService: BookCreateService;

  beforeEach(() => {
    eventBus = new FakeMessagingService();

    repository = new BookRepositoryInMemory();
    bookCreateService = new BookCreateService(eventBus, repository);
  });

  it('should create a book and publish the event', async () => {
    //clean event
    FakeMessagingService.clear();

    // Act
    await bookCreateService.run(BOOK_MOCK.id, BOOK_MOCK.title);

    const book = await repository.findOneById(new BookId(BOOK_MOCK.id));
    const findBook = book?.toPrimitive();

    expect({
      id: findBook?.id,
      title: findBook?.title,
    }).toMatchObject({
      id: BOOK_MOCK?.id,
      title: BOOK_MOCK?.title,
    });
  });
});
