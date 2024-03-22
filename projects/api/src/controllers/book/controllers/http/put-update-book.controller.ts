import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InvalidArgumentError } from '@shared/common/domain/value-object';
import { BookUpdateService } from '@shared/entities/book/application/book-update.service';
import { BOOK_ERROR_MAPPER, BookApiResponse, UpdateBookDto } from '../book.dto';

@ApiTags('book')
@Controller('/book')
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class BookUpdateController {
  constructor(private readonly bookUpdateService: BookUpdateService) {}

  @Put()
  @ApiCreatedResponse({
    description: 'update a book',
    status: 200,
    type: BookApiResponse,
  })
  @ApiBadRequestResponse({
    description: BOOK_ERROR_MAPPER.BAD_REQUEST,
    schema: {
      type: 'object',
      example: {
        data: undefined,
        error: BOOK_ERROR_MAPPER.BAD_REQUEST,
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
  @ApiBody({
    type: UpdateBookDto,
  })
  public async updateBook(@Body() body: UpdateBookDto): Promise<void> {
    try {
      const id = body.id;
      const title = body.title;

      await this.bookUpdateService.run(id, title);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      throw new HttpException(
        BOOK_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
