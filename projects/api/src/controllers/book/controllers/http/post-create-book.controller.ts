import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InvalidArgumentError } from '@shared/common/domain/value-object';
import { BookCreateService } from '@shared/entities/book/application/book-create.service';
import { BOOK_ERROR_MAPPER, BookApiResponse, CreateBookDto } from '../book.dto';

@ApiTags('book')
@Controller('/book')
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class BookCreateController {
  constructor(private readonly bookCreateService: BookCreateService) {}

  @Post()
  // @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'create a book',
    status: 201,
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
    type: CreateBookDto,
  })
  public async createBook(@Body() body: CreateBookDto): Promise<void> {
    try {
      const id = body.id;
      const title = body.title;

      await this.bookCreateService.run(id, title);
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
