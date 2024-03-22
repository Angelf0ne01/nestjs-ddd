export class BookAlreadyError extends Error {
  constructor() {
    super('Book already exist');
  }
}
