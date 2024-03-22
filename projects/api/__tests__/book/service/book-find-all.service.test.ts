import { EventBus } from '@shared/clients/rabbitmq/event-bus';
import { FakeMessagingService } from '@shared/clients/rabbitmq/testing';
import { BookRepositoryInMemory } from '@shared/entities/book/infrastructure/book-repository-in-memory';
import { BookCreateService } from '@shared/entities/book/application/book-create.service';
import { BookFindAllService } from '@shared/entities/book/application/book-find-all.service';
import { BookRepository } from '@shared/entities/book/domain/book.repository';
import { BOOK_MOCK } from '../mocks';

describe('BookFindAllService', () => {
  let eventBus: EventBus;
  let repository: BookRepository;
  let bookCreateService: BookCreateService;
  let bookFindAllService: BookFindAllService;

  beforeEach(() => {
    eventBus = new FakeMessagingService();
    repository = new BookRepositoryInMemory();
    bookCreateService = new BookCreateService(eventBus, repository);
    bookFindAllService = new BookFindAllService(repository);
  });

  it('should throw an empty array', async () => {
    // Assert
    expect(await bookFindAllService.run()).toMatchObject([]);
  });

  it('should return a book', async () => {
    // Act
    await bookCreateService.run(BOOK_MOCK.id, BOOK_MOCK.title);

    const books = await bookFindAllService.run();

    const findbook = await repository.findAll();

    // Assert
    expect(books.find(Boolean)?.toPrimitive()).toEqual(
      findbook.find(Boolean)?.toPrimitive(),
    );
  });
});
