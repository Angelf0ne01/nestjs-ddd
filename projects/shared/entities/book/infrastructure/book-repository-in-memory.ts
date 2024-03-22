import { Criteria } from '@shared/common/domain/criteria/criteria';
import { RepositoryAggregateInMemory } from '@shared/common/infraestructure/repository-aggregate-in-memory';
import { Book } from '../domain/book';
import { BookRepository } from '../domain/book.repository';

export class BookRepositoryInMemory
  extends RepositoryAggregateInMemory<Book>
  implements BookRepository
{
  constructor() {
    super();
  }
  matching(crteria: Criteria): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
}
