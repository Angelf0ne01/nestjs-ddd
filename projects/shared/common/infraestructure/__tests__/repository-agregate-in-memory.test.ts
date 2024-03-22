import { AggregateRoot } from '@shared/common/domain/aggregate-root';
import { UuidValueObject } from '@shared/common/domain/value-object';
import { RepositoryAggregateInMemory } from '../repository-aggregate-in-memory';

class EntityRoot extends AggregateRoot {
  public title = 'test';

  constructor() {
    super();
    this.id = UuidValueObject.random();
  }
}

describe('RepositoryAgregateInMemory', () => {
  it('should save an entity', async () => {
    const repository = new RepositoryAggregateInMemory<EntityRoot>();

    const entity = new EntityRoot();
    await repository.save(entity);
    const entities = await repository.findAll();
    expect(entities).toContain(entity);
  });

  it('should find an entity by id', async () => {
    const repository = new RepositoryAggregateInMemory<EntityRoot>();
    const entity = new EntityRoot();
    await repository.save(entity);
    const foundEntity = await repository.findById(entity.id.value);
    expect(foundEntity).toEqual(entity);
  });

  it('should update an entity', async () => {
    const repository = new RepositoryAggregateInMemory<EntityRoot>();
    const entity = new EntityRoot();
    await repository.save(entity);
    entity.title = 'new-title';
    await repository.update(entity);
    const find = await repository.findById(entity.id.value);
    expect(find?.title).toBe(entity.title);
  });

  it('should delete an entity by id', async () => {
    const repository = new RepositoryAggregateInMemory<EntityRoot>();
    const entity = new EntityRoot();
    await repository.save(entity);
    const deletedEntity = await repository.deleteById(entity.id.value);
    const entities = await repository.findAll();
    expect(entities).not.toContain(deletedEntity);
  });

  it('should delete an entity', async () => {
    const repository = new RepositoryAggregateInMemory<EntityRoot>();
    const entity = new EntityRoot();
    await repository.save(entity);
    await repository.delete(entity);
    const entities = await repository.findAll();
    expect(entities).not.toContain(entity);
  });
});
