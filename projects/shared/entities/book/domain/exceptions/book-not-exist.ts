export class BookNotExistError extends Error {
  constructor() {
    super('Book does not exist');
  }
}
