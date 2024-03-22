import { Nulleable } from '@shared/common/domain/base-entity';
import { AggregateRoot } from '../domain/aggregate-root';
import { UuidValueObject } from '../domain/value-object';

export class RepositoryAggregateInMemory<T extends AggregateRoot> {
  protected memory: T[] = [];

  async save(entity: T): Promise<void> {
    this.memory.push(entity);
  }

  async findAll(): Promise<T[]> {
    return new Promise(resolve => resolve(this.memory));
  }

  async findById(id: string): Promise<Nulleable<T>> {
    const filter = this.memory
      .filter(data => data.id.value === id)
      .find(Boolean);

    return new Promise(resolve => resolve(filter));
  }

  async findOneById(id: UuidValueObject): Promise<Nulleable<T>> {
    return await this.findById(id.value);
  }

  async update(update: Partial<T>): Promise<void> {
    const { id, ...rest } = update;
    const currentValue = await this.findById(id?.value as string);

    const newValue = { ...currentValue, ...rest, updated_at: new Date() };
    await this.deleteById(id?.value as string);
    this.memory = [...this.memory, newValue] as T[];
  }

  async deleteById(id: string): Promise<void> {
    const data = (await this.findById(id)) as T;
    this.memory = this.memory.filter(data => data.id.value !== id);
    new Promise(resolve =>
      resolve({
        ...data,
      }),
    );
  }

  async delete(entity: T): Promise<void> {
    await this.deleteById(entity.id.value);
  }
}
