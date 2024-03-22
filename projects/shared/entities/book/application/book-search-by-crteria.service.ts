import { Inject, Injectable } from '@nestjs/common';
import { Criteria } from '@shared/common/domain/criteria/criteria';
import { FiltersPrimitives } from '@shared/common/domain/criteria/filter';
import { Book } from '../domain/book';
import { BookRepository } from '../domain/book.repository';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class BooksSearchByCriteriaService {
  constructor(@Inject('repository') private repository: BookRepository) {}

  public async run(
    filters: FiltersPrimitives[],
    orderBy: string | undefined,
    orderType: string | undefined,
    pageSize: number | undefined,
    pageNumber: number | undefined,
  ): Promise<Book[]> {
    const criteria = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );
    return await this.repository.matching(criteria);
  }
}
