import {
  BaseEntity,
  CreateEntity,
  Nulleable,
} from '@shared/common/domain/base-entity';

export class RepositoryInMemory<T extends BaseEntity> {
  protected memory: T[] = [];

  async save(entity: CreateEntity<T>): Promise<void> {
    const payload = {
      ...entity,
      created_at: new Date(),
      updated_at: new Date(),
    } as T;
    this.memory.push(payload);
  }

  async findAll(): Promise<T[]> {
    return new Promise(resolve => resolve(this.memory));
  }

  async findById(id: string): Promise<Nulleable<T>> {
    const filter = this.memory.filter(data => data.id === id).find(Boolean);
    return new Promise(resolve => resolve(filter));
  }

  async update(update: Partial<T>): Promise<void> {
    const { id, ...rest } = update;
    const currentValue = await this.findById(id as string);
    const newValue = { ...currentValue, ...rest, updated_at: new Date() };
    await this.deleteById(id as string);
    const newMemory = [...this.memory, newValue] as T[];
    this.memory = newMemory;
  }

  async deleteById(id: string): Promise<void> {
    const filter = this.memory.filter(data => data.id !== id);
    this.memory = filter;
  }
}
