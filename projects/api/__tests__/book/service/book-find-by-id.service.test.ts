import { EventBus } from '@shared/clients/rabbitmq/event-bus';
import { FakeMessagingService } from '@shared/clients/rabbitmq/testing';
import { BOOK_MOCK, INVALID_ID_MOCK } from '../mocks';
import { BookRepositoryInMemory } from '@shared/entities/book/infrastructure/book-repository-in-memory';
import { BookCreateService } from '@shared/entities/book/application/book-create.service';
import { BookNotExistError } from '@shared/entities/book/domain/exceptions/book-not-exist';
import { BookFindByIdService } from '@shared/entities/book/application/book-find-by-id.service';

describe('BookFindOneByIdService', () => {
  let eventBus: EventBus;
  let repository: BookRepositoryInMemory;
  let bookCreateService: BookCreateService;
  let bookFindByIdService: BookFindByIdService;

  beforeEach(() => {
    eventBus = new FakeMessagingService();
    repository = new BookRepositoryInMemory();

    bookCreateService = new BookCreateService(eventBus, repository);
    bookFindByIdService = new BookFindByIdService(repository);
  });

  it('should throw an exception when book does not exist', async () => {
    // Assert
    await expect(
      bookFindByIdService.run(INVALID_ID_MOCK),
    ).rejects.toBeInstanceOf(BookNotExistError);
  });

  it('should return a book', async () => {
    // Act
    await bookCreateService.run(BOOK_MOCK.id, BOOK_MOCK.title);

    const book = await bookFindByIdService.run(BOOK_MOCK.id);
    const findBook = book?.toPrimitive();

    // Assert
    expect({
      id: findBook?.id,
      title: findBook?.title,
    }).toMatchObject({
      id: BOOK_MOCK?.id,
      title: BOOK_MOCK?.title,
    });
  });
});
