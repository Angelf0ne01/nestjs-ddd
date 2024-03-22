import { Injectable } from '@nestjs/common';
import { Nulleable } from '@shared/common/domain/base-entity';
import { StoreInS3, StoreInS3Config } from './aws-s3/store-in-s3';
import { StoreInFileSystem } from './store-in-file-system';
import { StoreRepository } from './store-reposistory';

export interface StoreProxyConfig extends StoreInS3Config {
  folder: string;
}
@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class StoreProxyService implements StoreRepository {
  private basePath: Nulleable<string> = '';
  private store: StoreRepository;
  constructor(config: StoreProxyConfig) {
    const isProduction = process.env.NODE_ENV === 'production';

    this.basePath = config.folder;

    this.store = isProduction
      ? new StoreInS3(config)
      : new StoreInFileSystem(config.folder);
  }
  public async uploadFile(fileName: string, file: Buffer): Promise<string> {
    const path = `${this.basePath}/${fileName}`;
    return await this.store.uploadFile(path, file);
  }

  public async deleteFile(fileName: string): Promise<string> {
    const path = `${this.basePath}/${fileName}`;
    return await this.store.deleteFile(path);
  }

  public async getFile(fileName: string): Promise<Buffer> {
    const path = `${this.basePath}/${fileName}`;
    return await this.store.getFile(path);
  }

  public async run(): Promise<StoreRepository> {
    return this.store;
  }
}
