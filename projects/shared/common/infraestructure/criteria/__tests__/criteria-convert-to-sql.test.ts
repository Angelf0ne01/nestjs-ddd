import { Criteria } from '@shared/common/domain/criteria/criteria';
import { FiltersPrimitives } from '@shared/common/domain/criteria/filter';
import { Operator } from '@shared/common/domain/criteria/filter-operator';
import { CriteriaConvertToSql } from '../criteria-convert-to-sql';

describe('CriteriaToSqlConverter should', () => {
  const converter = new CriteriaConvertToSql();
  it('Generate simple select with an empty criteria', () => {
    const filters: FiltersPrimitives[] = [];
    const orderBy = undefined;
    const orderType = undefined;
    const pageSize = undefined;
    const pageNumber = undefined;

    const criteriaEmpty = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name'],
      'users',
      criteriaEmpty,
    );

    expect(actualQuery).toBe('SELECT id, name FROM users;');
  });

  it('Generate select with order', () => {
    const filters: FiltersPrimitives[] = [];
    const orderBy = 'id';
    const orderType = 'DESC';
    const pageSize = undefined;
    const pageNumber = undefined;

    const criteriaEmptySorted = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name'],
      'users',
      criteriaEmptySorted,
    );

    expect(actualQuery).toBe('SELECT id, name FROM users ORDER BY id DESC;');
  });

  it('Generate select with one filter', () => {
    const filters: FiltersPrimitives[] = [
      {
        field: 'name',
        operator: Operator.EQUAL,
        value: 'Raquel',
      },
    ];
    const orderBy = undefined;
    const orderType = undefined;
    const pageSize = undefined;
    const pageNumber = undefined;

    const criteriaWithOneFilter = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name'],
      'users',
      criteriaWithOneFilter,
    );

    expect(actualQuery).toBe(
      "SELECT id, name FROM users WHERE name = 'Raquel';",
    );
  });

  it('Generate select with one filter sorted', () => {
    const filters: FiltersPrimitives[] = [
      {
        field: 'name',
        operator: Operator.EQUAL,
        value: 'Raquel',
      },
    ];
    const orderBy = 'id';
    const orderType = 'DESC';
    const pageSize = undefined;
    const pageNumber = undefined;

    const criteriaWithOneFilterSorted = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name'],
      'users',
      criteriaWithOneFilterSorted,
    );

    expect(actualQuery).toBe(
      "SELECT id, name FROM users WHERE name = 'Raquel' ORDER BY id DESC;",
    );
  });

  it('Generate select with multiples filters', () => {
    const filters: FiltersPrimitives[] = [
      {
        field: 'name',
        operator: Operator.EQUAL,
        value: 'Raquel',
      },
      {
        field: 'email',
        operator: Operator.EQUAL,
        value: 'test@company.com',
      },
    ];
    const orderBy = undefined;
    const orderType = undefined;
    const pageSize = undefined;
    const pageNumber = undefined;

    const criteriaWithMultiplyFilter = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name', 'email'],
      'users',
      criteriaWithMultiplyFilter,
    );

    expect(actualQuery).toBe(
      "SELECT id, name, email FROM users WHERE name = 'Raquel' AND email = 'test@company.com';",
    );
  });

  it('Generate select with multiples filters and sort', () => {
    const filters: FiltersPrimitives[] = [
      {
        field: 'name',
        operator: Operator.EQUAL,
        value: 'Raquel',
      },
      {
        field: 'email',
        operator: Operator.EQUAL,
        value: 'test@company.com',
      },
    ];
    const orderBy = 'id';
    const orderType = 'DESC';
    const pageSize = undefined;
    const pageNumber = undefined;

    const criteriaWithMultiplyFilter = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name', 'email'],
      'users',
      criteriaWithMultiplyFilter,
    );

    expect(actualQuery).toBe(
      "SELECT id, name, email FROM users WHERE name = 'Raquel' AND email = 'test@company.com' ORDER BY id DESC;",
    );
  });

  it('Generate select with one contains filter', () => {
    const filters: FiltersPrimitives[] = [
      {
        field: 'name',
        operator: Operator.CONTAINS,
        value: 'Raquel',
      },
    ];
    const orderBy = undefined;
    const orderType = undefined;
    const pageSize = undefined;
    const pageNumber = undefined;

    const criteriaWithOneFilterConstain = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name'],
      'users',
      criteriaWithOneFilterConstain,
    );

    expect(actualQuery).toBe(
      "SELECT id, name FROM users WHERE name LIKE '%Raquel%';",
    );
  });

  it('Generate select with one not contains filter', () => {
    const filters: FiltersPrimitives[] = [
      {
        field: 'name',
        operator: Operator.NOT_CONTAINS,
        value: 'Raquel',
      },
    ];
    const orderBy = undefined;
    const orderType = undefined;
    const pageSize = undefined;
    const pageNumber = undefined;

    const criteriaWithOneFilterNotConstain = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name'],
      'users',
      criteriaWithOneFilterNotConstain,
    );

    expect(actualQuery).toBe(
      "SELECT id, name FROM users WHERE name NOT LIKE '%Raquel%';",
    );
  });

  it('Generate simple select paginated', () => {
    const filters: FiltersPrimitives[] = [];
    const orderBy = undefined;
    const orderType = undefined;
    const pageSize = 10;
    const pageNumber = 3;

    const criteriaPaginated = Criteria.fromPrimitives(
      filters,
      orderBy,
      orderType,
      pageSize,
      pageNumber,
    );

    const actualQuery = converter.convert(
      ['id', 'name'],
      'users',
      criteriaPaginated,
    );

    expect(actualQuery).toBe('SELECT id, name FROM users LIMIT 10 OFFSET 20;');
  });
});
