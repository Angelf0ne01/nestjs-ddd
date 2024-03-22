import { BaseEntityTypeOrm } from '@shared/common/infraestructure/model/base-entity-typeorm';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'books',
})
export class BookEntity extends BaseEntityTypeOrm {
  @Column('varchar')
  title!: string;
}
