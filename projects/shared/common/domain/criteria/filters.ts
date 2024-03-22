import { Filter, FiltersPrimitives } from './filter';

export class Filters {
  constructor(public readonly value: Filter[]) {}

  static fromPrimitives(filters: FiltersPrimitives[]): Filters {
    return new Filters(
      filters.map(filter =>
        Filter.fromPrimitives(filter.field, filter.operator, filter.value),
      ),
    );
  }

  isEmpty(): boolean {
    return this.value.length === 0;
  }
}
