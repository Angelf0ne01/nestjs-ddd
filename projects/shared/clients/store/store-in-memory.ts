import { ErrorStore } from './error-store';
import { StoreRepository } from './store-reposistory';

interface StoreTmpType {
  filePath: string;
  file: Buffer;
}
export class StoreInMemory implements StoreRepository {
  private storeTmp: StoreTmpType[] = [];
  constructor(private readonly basePath: string) {}

  uploadFile(fileName: string, file: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `${this.basePath}/${fileName}`;
      try {
        this.storeTmp.push({
          filePath,
          file,
        });
        resolve(fileName);
      } catch {
        reject(ErrorStore.errorSaveFile(filePath));
      }
    });
  }
  deleteFile(fileName: string): Promise<string> {
    const filePath = `${this.basePath}/${fileName}`;
    return new Promise<string>((resolve, reject) => {
      const idx = this.storeTmp.findIndex(
        element => element.filePath == filePath,
      );
      if (!idx) {
        reject(ErrorStore.errorDeleteFile(filePath));
      }

      this.storeTmp.slice(idx, 1);
      resolve(fileName);
    });
  }
  getFile(fileName: string): Promise<Buffer> {
    const filePath = `${this.basePath}/${fileName}`;
    return new Promise((resolve, reject) => {
      const element = this.storeTmp.find(
        element => element.filePath === filePath,
      );
      const file = element?.file;
      if (file) {
        resolve(file);
      } else {
        reject(ErrorStore.errorGetFile(filePath));
      }
    });
  }
}
