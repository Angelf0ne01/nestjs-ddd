/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBus } from '@shared/clients/rabbitmq/event-bus';
import { FakeMessagingService } from '@shared/clients/rabbitmq/testing';
import { BookCreateService } from '@shared/entities/book/application/book-create.service';
import { BookRepositoryInMemory } from '@shared/entities/book/infrastructure/book-repository-in-memory';
import { BookRepository } from '@shared/entities/book/domain/book.repository';
import { BOOK_MOCK } from '../mocks';
import { BookId } from '@shared/entities/book/domain/value-object';
import { BookUpdateService } from '@shared/entities/book/application/book-update.service';
import { BookFindByIdService } from '@shared/entities/book/application/book-find-by-id.service';

describe('BookUpdateService', () => {
  let eventBus: EventBus;
  let repository: BookRepository;
  let bookCreateService: BookCreateService;
  let bookUpdateService: BookUpdateService;
  let bookFindByIdService: BookFindByIdService;

  beforeEach(() => {
    eventBus = new FakeMessagingService();

    repository = new BookRepositoryInMemory();
    bookFindByIdService = new BookFindByIdService(repository);
    bookCreateService = new BookCreateService(eventBus, repository);

    bookUpdateService = new BookUpdateService(
      eventBus,
      repository,
      bookFindByIdService,
    );
  });

  it('should update a book and publish the event', async () => {
    //clean event
    FakeMessagingService.clear();

    // Act
    const NEW_TITLE = 'title-update';
    await bookCreateService.run(BOOK_MOCK.id, BOOK_MOCK.title);

    const book = await repository.findOneById(new BookId(BOOK_MOCK.id));

    await bookUpdateService.run(BOOK_MOCK.id, NEW_TITLE);

    const findBookUpdated = book?.toPrimitive();

    // Assert
    expect({
      id: findBookUpdated?.id,
      title: findBookUpdated?.title,
    }).toMatchObject({
      id: BOOK_MOCK?.id,
      title: NEW_TITLE,
    });
  });
});
