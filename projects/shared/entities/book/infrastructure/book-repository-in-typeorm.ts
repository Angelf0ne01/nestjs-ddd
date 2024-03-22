import { InjectRepository } from '@nestjs/typeorm';
import { Nulleable } from '@shared/common/domain/base-entity';
import { Criteria } from '@shared/common/domain/criteria/criteria';
import { CriteriaToTypeOrmConverter } from '@shared/common/infraestructure/criteria/criteria-convert-to-typeorm';
import { Book } from '@shared/entities/book/domain/book';
import { Repository } from 'typeorm';
import { BookRepository } from '../domain/book.repository';
import { BookId } from '../domain/value-object';
import { BookEntity } from './model/book-entity-typeorm.entity';

export class BookRepositoryInTypeOrm implements BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private repository: Repository<BookEntity>,
  ) {}

  public async save(book: Book): Promise<void> {
    const model = this.repository.create(book.toPrimitive());

    await this.repository.save(model);
  }

  public async update(book: Book): Promise<void> {
    await this.save(book);
  }

  public async findAll(): Promise<Book[]> {
    const bookEntities = await this.repository.find();

    return bookEntities.map(bookEntity =>
      this.convertEntityToValueObject(bookEntity),
    );
  }

  public async matching(criteria: Criteria): Promise<Book[]> {
    const typeorm = new CriteriaToTypeOrmConverter().convert(criteria);

    const bookEntities = await this.repository.find({
      ...typeorm,
    });

    return bookEntities.map(bookEntity =>
      this.convertEntityToValueObject(bookEntity),
    );
  }

  public async findOneById(bookId: BookId): Promise<Nulleable<Book>> {
    const bookEntity = await this.repository.findOne({
      where: { id: bookId.value },
    });

    if (!bookEntity) {
      return undefined;
    }

    return this.convertEntityToValueObject(bookEntity);
  }

  public async delete(book: Book): Promise<void> {
    const model = this.repository.create(book.toPrimitive());
    await this.repository.softRemove(model);
  }

  private convertEntityToValueObject(bookEntity: BookEntity): Book {
    return Book.fromEntity(bookEntity.id, bookEntity.title);
  }
}
