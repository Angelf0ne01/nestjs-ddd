import { FiltersPrimitives } from './filter';
import { Filters } from './filters';
import { Order } from './order';

export class Criteria {
  constructor(
    public readonly filters: Filters,
    public readonly order: Order,
    public readonly pageSize: number | undefined,
    public readonly pageNumber: number | undefined,
  ) {
    if (pageNumber !== undefined && pageSize === undefined) {
      throw new Error('Page size is required when page number is defined');
    }
  }

  static fromPrimitives(
    filters: FiltersPrimitives[],
    orderBy: string | undefined,
    orderType: string | undefined,
    pageSize: number | undefined,
    pageNumber: number | undefined,
  ): Criteria {
    return new Criteria(
      Filters.fromPrimitives(filters),
      Order.fromPrimitives(orderBy, orderType),
      pageSize,
      pageNumber,
    );
  }

  hasOrder(): boolean {
    return !this.order.isNone();
  }

  hasFilters(): boolean {
    return !this.filters.isEmpty();
  }
}
