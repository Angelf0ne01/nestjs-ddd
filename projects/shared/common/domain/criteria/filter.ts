import { FilterField } from './filter-field';
import { FilterOperator, Operator } from './filter-operator';
import { FilterValue } from './filter-value';

export interface FiltersPrimitives {
  field: string;
  operator: string;
  value: string;
}

export class Filter {
  readonly field: FilterField;
  readonly operator: FilterOperator;
  readonly value: FilterValue;

  constructor(
    field: FilterField,
    operator: FilterOperator,
    value: FilterValue,
  ) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  static fromPrimitives(
    field: string,
    operator: string,
    value: string,
  ): Filter {
    return new Filter(
      new FilterField(field),
      new FilterOperator(operator as Operator),
      new FilterValue(value),
    );
  }
}
