import { OrderBy } from './order-by';
import { OrderType, OrderTypes } from './order-type';

export class Order {
  constructor(
    public readonly orderBy: OrderBy,
    public readonly orderType: OrderType,
  ) {}

  static none(): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE));
  }

  static fromPrimitives(
    orderBy: string | undefined,
    orderType: string | undefined,
  ): Order {
    return orderBy === undefined
      ? Order.none()
      : new Order(new OrderBy(orderBy), new OrderType(orderType as OrderTypes));
  }

  isNone(): boolean {
    return this.orderType.isNone();
  }
}
