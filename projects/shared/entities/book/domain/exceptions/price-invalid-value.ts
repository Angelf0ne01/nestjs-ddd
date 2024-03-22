import { InvalidArgumentError } from '@shared/common/domain/value-object';

export class PriceInvalidValue extends InvalidArgumentError {
  constructor() {
    super('Price must be a number with two decimal places');
  }
}
