import { Inject, Injectable } from '@nestjs/common';
import { Book } from '../domain/book';
import { BookRepository } from '../domain/book.repository';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class BookFindAllService {
  constructor(@Inject('repository') private repository: BookRepository) {}

  public async run(): Promise<Book[]> {
    return await this.repository.findAll();
  }
}
