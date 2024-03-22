import { Criteria } from '../../domain/criteria/criteria';
import { Filter } from '../../domain/criteria/filter';

export class CriteriaConvertToSql {
  convert(
    fieldsToSelect: string[],
    tableName: string,
    criteria: Criteria,
  ): string {
    let query = `SELECT ${fieldsToSelect.join(', ')} FROM ${tableName}`;

    if (criteria.hasFilters()) {
      query = `${query} WHERE`;

      const whereQuery = criteria.filters.value.map(filter =>
        this.generateWhereQuery(filter),
      );

      query = `${query} ${whereQuery.join(' AND ')}`;
    }

    if (criteria.hasOrder()) {
      query = `${query} ORDER BY ${
        criteria.order.orderBy.value
      } ${criteria.order.orderType.value.valueOf()}`;
    }

    if (criteria.pageSize !== undefined) {
      query = `${query} LIMIT ${criteria.pageSize}`;
    }

    if (criteria.pageSize !== undefined && criteria.pageNumber !== undefined) {
      query = `${query} OFFSET ${
        criteria.pageSize * (criteria.pageNumber - 1)
      }`;
    }

    return `${query};`;
  }

  private generateWhereQuery(filter: Filter) {
    if (filter.operator.isContains()) {
      return `${filter.field.value} LIKE '%${filter.value.value}%'`;
    }

    if (filter.operator.isNotContains()) {
      return `${filter.field.value} NOT LIKE '%${filter.value.value}%'`;
    }

    return `${filter.field.value} ${filter.operator.value} '${filter.value.value}'`;
  }
}
