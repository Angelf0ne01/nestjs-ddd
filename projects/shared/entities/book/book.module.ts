import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagingService, RabbitmqModule } from '@shared/clients/rabbitmq';
import { StoreModule } from '@shared/clients/store/store.module';
import { BookFindByIdService } from '@shared/entities/book/application/book-find-by-id.service';
import { BookCreateService } from './application/book-create.service';
import { BookFindAllService } from './application/book-find-all.service';
import { BooksSearchByCriteriaService } from './application/book-search-by-crteria.service';
import { BookUpdateService } from './application/book-update.service';
import { ListenerBookCreate } from './application/listeners/listener-book-created.service';
import { BookRepositoryInTypeOrm } from './infrastructure/book-repository-in-typeorm';
import { BookEntity } from './infrastructure/model/book-entity-typeorm.entity';

const listenerService: Provider[] = [ListenerBookCreate];
const applicationService: Provider[] = [
  ...listenerService,
  BookCreateService,
  BookFindByIdService,
  BookFindAllService,
  BooksSearchByCriteriaService,
  BookUpdateService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    RabbitmqModule,
    StoreModule,
  ],
  providers: [
    ...applicationService,
    {
      provide: 'repository',
      useClass: BookRepositoryInTypeOrm,
    },
    {
      provide: 'event-bus',
      useExisting: MessagingService,
    },
  ],
  exports: [...applicationService],
})
export class BookModule {}
