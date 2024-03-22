import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@shared/clients/rabbitmq';
import { BookCreatedWorkerService } from './applications/book-created.service';
import { BookModule } from '@shared/entities/book/book.module';

@Module({
  imports: [RabbitmqModule, BookModule],
  providers: [BookCreatedWorkerService],
  exports: [BookCreatedWorkerService],
})
export class BookWorkerModule {}
