import { Injectable } from '@nestjs/common';
import AWS, { S3 } from 'aws-sdk';
import { ErrorStore } from '../error-store';
import { StoreRepository } from '../store-reposistory';

export interface StoreInS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}
@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class StoreInS3 implements StoreRepository {
  private s3: S3;
  private bucket = '';
  constructor({
    accessKeyId,
    secretAccessKey,
    region,
    bucket,
  }: StoreInS3Config) {
    this.bucket = bucket;

    const options = {
      accessKeyId,
      secretAccessKey,
      region,
    };

    AWS.config.update(options);
    this.s3 = new AWS.S3();
  }

  async uploadFile(fileName: string, file: Buffer): Promise<string> {
    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: fileName,
      Body: file,
    };

    try {
      await this.s3.upload(params).promise();
      return fileName;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ errores: error });
      return ErrorStore.errorSaveFile(fileName);
    }
  }

  async deleteFile(fileName: string): Promise<string> {
    const params: S3.DeleteObjectRequest = {
      Key: fileName,
      Bucket: this.bucket,
    };

    try {
      await this.s3.deleteObject(params).promise();
      return fileName;
    } catch {
      return ErrorStore.errorDeleteFile(fileName);
    }
  }

  async getFile(fileName: string): Promise<Buffer> {
    const params: S3.GetObjectRequest = {
      Key: fileName,
      Bucket: this.bucket,
    };

    try {
      const file = await this.s3.getObject(params).promise();
      return file.Body as Buffer;
    } catch {
      return ErrorStore.errorGetFile(fileName);
    }
  }
}
