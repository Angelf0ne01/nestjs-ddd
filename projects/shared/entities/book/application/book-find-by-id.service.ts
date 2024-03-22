import { Inject } from '@nestjs/common';
import { Book } from '../domain/book';
import { BookRepository } from '../domain/book.repository';
import { BookNotExistError } from '../domain/exceptions/book-not-exist';
import { BookId } from '../domain/value-object/book-id';

export class BookFindByIdService {
  constructor(@Inject('repository') private repository: BookRepository) {}

  public async run(bookId: string): Promise<Book> {
    const book = await this.repository.findOneById(new BookId(bookId));

    if (!book) {
      throw new BookNotExistError();
    }

    return book;
  }
}
