export interface StoreRepository {
  uploadFile: (fileName: string, file: Buffer) => Promise<string>;
  deleteFile: (fileName: string) => Promise<string>;
  getFile: (fileName: string) => Promise<Buffer>;
}
