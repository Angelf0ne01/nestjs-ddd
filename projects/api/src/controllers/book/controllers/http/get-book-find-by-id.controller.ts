import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InvalidArgumentError } from '@shared/common/domain/value-object';
import { BookFindByIdService } from '@shared/entities/book/application/book-find-by-id.service';
import { BookNotExistError } from '@shared/entities/book/domain/exceptions/book-not-exist';
import { BOOK_ERROR_MAPPER, BookApiResponse } from '../book.dto';

@ApiTags('book')
@Controller('book')
export class BookFindOneByIdController {
  constructor(private readonly bookFindByIdService: BookFindByIdService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id',
  })
  @ApiOkResponse({
    description: 'get a book',
    type: BookApiResponse,
    status: 200,
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
  public async findOneById(@Param('id') id: string): Promise<BookApiResponse> {
    try {
      const book = await this.bookFindByIdService.run(id);

      return {
        data: book.toPrimitive(),
      };
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      if (error instanceof BookNotExistError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        BOOK_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
