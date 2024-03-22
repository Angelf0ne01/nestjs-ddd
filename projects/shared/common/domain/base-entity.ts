export type Nulleable<T> = T | undefined | null;
export type CreateEntity<T> = Omit<T, 'created_at' | 'updated_at'>;
export type UpdateEntity<T> = Omit<T, 'created_at' | 'updated_at'>;

export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
