import { Injectable } from '@nestjs/common';
import { BookPrimitive } from '../../domain/book';
import { DomaintEvent } from '@shared/clients/rabbitmq/domain-events';
@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class ListenerBookCreate {
  constructor() {}

  public async run(event: DomaintEvent<BookPrimitive>): Promise<void> {
    console.log('Enviar-emiail:', event);
  }
}
