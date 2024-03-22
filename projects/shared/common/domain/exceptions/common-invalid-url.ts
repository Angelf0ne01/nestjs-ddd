import { InvalidArgumentError } from '@shared/common/domain/value-object';
export class CommonInvalidUrl extends InvalidArgumentError {
  constructor(url: string) {
    super(`URL: ${url}, is not valid`);
  }
}
