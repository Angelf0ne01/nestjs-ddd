import { AggregateRoot } from '@shared/common/domain/aggregate-root';
import { BookCreateEvent } from './events/book-create.event';
import { BookUpdateEvent } from './events/book-update.event';
import { BookId, BookTitle } from './value-object';

export interface BookPrimitive {
  id: string;
  title: string;
}

export class Book extends AggregateRoot {
  id: BookId;
  title: BookTitle;

  private constructor(id: BookId, title: BookTitle) {
    super();
    this.id = id;
    this.title = title;
  }

  public static create(id: BookId, title: BookTitle): Book {
    const book = new Book(id, title);

    book.record(new BookCreateEvent(book.id.value, book.title.value));

    return book;
  }

  public update(title: BookTitle): Book {
    this.title = title;
    this.record(new BookUpdateEvent(this.id.value, this.title.value));
    return this;
  }

  public toPrimitive(): BookPrimitive {
    return {
      id: this.id.value,
      title: this.title.value,
    };
  }

  public static fromEntity(id: string, title: string) {
    return new Book(new BookId(id), new BookTitle(title));
  }
}
