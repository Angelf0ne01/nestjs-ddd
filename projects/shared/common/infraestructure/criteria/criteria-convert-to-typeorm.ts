import { Criteria } from '@shared/common/domain/criteria/criteria';
import { Filter } from '@shared/common/domain/criteria/filter';
import { Like, Not } from 'typeorm';

type Mappings = { [key: string]: string };

type TypeOrmOptions = {
  order?: { [key: string]: string };
  where?: { [key: string]: string };
  take?: number;
  skip?: number;
};

export class CriteriaToTypeOrmConverter {
  convert(criteria: Criteria, mappings: Mappings = {}): TypeOrmOptions {
    const query: TypeOrmOptions = {};

    if (criteria.hasFilters()) {
      // eslint-disable-next-line unicorn/no-array-reduce
      query.where = criteria.filters.value.reduce((acc, filter) => {
        return { ...acc, ...this.generateWhereQuery(filter, mappings) };
      }, {});
    }

    if (criteria.hasOrder()) {
      query.order = {
        [criteria.order.orderBy.value]: criteria.order.orderType.value,
      };
    }

    if (criteria.pageSize !== undefined) {
      query.take = criteria.pageSize;
    }

    if (criteria.pageSize !== undefined && criteria.pageNumber !== undefined) {
      query.skip = criteria.pageSize * (criteria.pageNumber - 1);
    }

    return query;
  }

  private generateWhereQuery(filter: Filter, mappings: Mappings = {}) {
    const field = mappings[filter.field.value] || filter.field.value;
    const fieldValue = filter.value.value;

    // Verificamos si el campo tiene notación de punto (para campos anidados)
    const fieldParts: string[] = field.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereQuery: { [key: string]: any } = {};

    // Construimos la estructura anidada del objeto whereQuery
    let currentQueryLevel = whereQuery;

    for (let i = 0; i < fieldParts.length - 1; i++) {
      const fieldPart = fieldParts[i];
      currentQueryLevel[fieldPart] = currentQueryLevel[fieldPart] || {};
      currentQueryLevel = currentQueryLevel[fieldPart];
    }

    // Aplicamos el operador según el tipo de filtro
    if (filter.operator.isContains()) {
      // eslint-disable-next-line unicorn/prefer-at
      currentQueryLevel[fieldParts[fieldParts.length - 1]] = Like(
        `%${fieldValue}%`,
      );
    } else if (filter.operator.isNotContains()) {
      // eslint-disable-next-line unicorn/prefer-at
      currentQueryLevel[fieldParts[fieldParts.length - 1]] = Not(
        Like(`%${fieldValue}%`),
      );
    } else if (filter.operator.isNotEquals()) {
      // eslint-disable-next-line unicorn/prefer-at
      currentQueryLevel[fieldParts[fieldParts.length - 1]] = Not(fieldValue);
    } else {
      // eslint-disable-next-line unicorn/prefer-at
      currentQueryLevel[fieldParts[fieldParts.length - 1]] = fieldValue;
    }

    // Retornamos el objeto de filtro actualizado
    return whereQuery;
  }
}
