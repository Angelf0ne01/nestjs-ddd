import fs from 'node:fs';
import path from 'node:path';
import { Injectable } from '@nestjs/common';
import { ErrorStore } from './error-store';
import { StoreRepository } from './store-reposistory';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class StoreInFileSystem implements StoreRepository {
  private readonly basePath: string;
  constructor(currentPath: string) {
    this.basePath = path.join(process.cwd(), currentPath);
  }

  uploadFile(fileName: string, file: Buffer): Promise<string> {
    const filePath = path.join(this.basePath, fileName);

    return new Promise((resolve, reject) => {
      const directoryPath = path.dirname(filePath);

      fs.mkdir(directoryPath, { recursive: true }, error => {
        if (error) {
          reject(ErrorStore.errorSaveFile(filePath));
        }
        fs.writeFile(filePath, file, err => {
          if (err) {
            reject(ErrorStore.errorSaveFile(filePath));
          }
          resolve(fileName);
        });
      });
    });
  }

  deleteFile(fileName: string): Promise<string> {
    const filePath = path.join(this.basePath, fileName);
    return new Promise<string>((resolve, reject) => {
      fs.unlink(filePath, err => {
        if (err) {
          reject(ErrorStore.errorDeleteFile(filePath));
        }
        resolve(fileName);
      });
    });
  }

  getFile(fileName: string): Promise<Buffer> {
    const filePath = path.join(this.basePath, fileName);
    return new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filePath, (err, file) => {
        if (err) {
          reject(ErrorStore.errorGetFile(filePath));
        }
        resolve(file);
      });
    });
  }
}
