import { InvalidArgumentError } from './invalid-argument-error';
import { ValueObject } from './value-object';

export class EmailValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validateEmail(value);
  }

  public getValue(): string {
    return this.value;
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new InvalidArgumentError(`Invalid email format`);
    }
  }
}
