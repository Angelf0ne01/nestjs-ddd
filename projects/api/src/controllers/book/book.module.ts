import { Module } from '@nestjs/common';
import { BookModule } from '@shared/entities/book/book.module';
import { BookFindOneByIdController } from './controllers/http/get-book-find-by-id.controller';
import { BookSearchController } from './controllers/http/get-search-book.controller';
import { BookCreateController } from './controllers/http/post-create-book.controller';
import { BookUpdateController } from './controllers/http/put-update-book.controller';

@Module({
  imports: [BookModule],
  controllers: [
    BookCreateController,
    BookFindOneByIdController,
    BookSearchController,
    BookUpdateController,
  ],
  providers: [],
})
export class BookApiModule {}
