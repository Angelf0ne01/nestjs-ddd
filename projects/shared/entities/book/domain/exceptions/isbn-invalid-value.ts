import { InvalidArgumentError } from '@shared/common/domain/value-object';

export class IsbnInvalidValue extends InvalidArgumentError {
  constructor() {
    super('Ivalid ISBN');
  }
}
