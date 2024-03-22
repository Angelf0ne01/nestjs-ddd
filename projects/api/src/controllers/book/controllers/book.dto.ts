import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDTO } from '@shared/common/infraestructure/controller/base-dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export enum BOOK_ERROR_MAPPER {
  NOT_FOUND = 'book.not-found',
  BAD_REQUEST = 'book.bad-request',
  INTERNAL_SERVER_ERROR = 'book.internal-server-error',
}

export class BookDto {
  @IsUUID()
  @ApiProperty()
  id!: string;

  @IsString()
  @ApiProperty({ type: String })
  title!: string;
}

export class BookListApiResponse implements BaseDTO<BookDto[]> {
  @ApiPropertyOptional({ type: BookDto, isArray: true })
  @IsOptional()
  data?: BookDto[];

  @ApiPropertyOptional()
  @IsOptional()
  error?: string;
}

export class BookApiResponse implements BaseDTO<BookDto> {
  @ApiPropertyOptional({ type: BookDto })
  @IsOptional()
  data?: BookDto;

  @ApiPropertyOptional()
  @IsOptional()
  error?: string;
}

export class CreateBookDto {
  @IsUUID()
  @ApiProperty()
  id!: string;

  @IsString()
  @ApiProperty({ type: String })
  title!: string;
}

export class UpdateBookDto {
  @IsUUID()
  @ApiProperty()
  id!: string;

  @IsString()
  @ApiProperty({ type: String })
  title!: string;
}
