import { StringValueObject } from '@shared/common/domain/value-object';
import { CommonInvalidUrl } from '../exceptions/common-invalid-url';

export class UrlValueObject extends StringValueObject {
  constructor(url: string) {
    UrlValueObject.isValidUrl(url);

    super(url);
  }

  private static isValidUrl(url: string): void {
    const regexp =
      /^https?:\/\/(?:www\.)?[\dA-Za-z-]+(?:\.[A-Za-z]{2,})+(?:\/\S*)?$/;

    if (!regexp.test(url)) {
      throw new CommonInvalidUrl(url);
    }
  }
}
