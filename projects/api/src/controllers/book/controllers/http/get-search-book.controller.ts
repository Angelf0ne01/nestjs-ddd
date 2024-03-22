import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FiltersPrimitives } from '@shared/common/domain/criteria/filter';
import { BooksSearchByCriteriaService } from '@shared/entities/book/application/book-search-by-crteria.service';
import { BOOK_ERROR_MAPPER, BookListApiResponse } from '../book.dto';

@ApiTags('book')
@Controller('/book-search')
export class BookSearchController {
  constructor(
    private readonly booksSearchByCriteriaService: BooksSearchByCriteriaService,
  ) {}

  @Get('')
  @ApiOkResponse({
    description: 'get a list of authors',
    type: BookListApiResponse,
  })
  @ApiNotFoundResponse({
    description: BOOK_ERROR_MAPPER.NOT_FOUND,
    schema: {
      type: 'object',
      example: {
        data: undefined,
        error: BOOK_ERROR_MAPPER.NOT_FOUND,
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: BOOK_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
    schema: {
      type: 'object',
      example: {
        data: undefined,
        error: BOOK_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
      },
    },
  })
  public async searchAuthors(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Query() queryParms: any,
  ): Promise<BookListApiResponse> {
    try {
      const filterAux = queryParms?.filters || {};

      const transformedFilters = [];

      // Procesamiento para transformar los query params
      for (let i = 0; i < filterAux.length; i += 3) {
        const field = filterAux[i];
        const operator = filterAux[i + 1];
        const value = filterAux[i + 2];
        transformedFilters.push({ field, operator, value });
      }

      const filters: FiltersPrimitives[] = transformedFilters;

      const orderBy = queryParms?.orderBy;
      const order = queryParms?.order;
      const pageSize = queryParms?.pageSize
        ? Number.parseInt(queryParms?.pageSize)
        : undefined;
      const pageNumber = queryParms?.pageNumber
        ? Number.parseInt(queryParms?.pageNumber)
        : undefined;

      const books = await this.booksSearchByCriteriaService.run(
        filters,
        orderBy,
        order,
        pageSize,
        pageNumber,
      );

      const booksResp = books.map(book => {
        const bookWithCdn = book.toPrimitive();
        return bookWithCdn;
      });

      return { data: booksResp };
    } catch (error) {
      throw new HttpException(error as Error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
