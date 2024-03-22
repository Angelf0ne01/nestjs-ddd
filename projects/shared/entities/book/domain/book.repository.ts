import { CreateEntity, Nulleable } from '@shared/common/domain/base-entity';
import { Criteria } from '@shared/common/domain/criteria/criteria';
import { Book } from '@shared/entities/book/domain/book';
import { BookId } from './value-object';

export interface BookRepository {
  save(book: CreateEntity<Book>): Promise<void>;
  update(book: Partial<Book>): Promise<void>;
  delete(book: Book): Promise<void>;
  findOneById(bookId: BookId): Promise<Nulleable<Book>>;
  findAll(): Promise<Book[]>;
  matching(crteria: Criteria): Promise<Book[]>;
}
