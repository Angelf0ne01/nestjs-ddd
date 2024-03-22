import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import Joi from 'joi';

export * from '@nestjs/typeorm';
export * from 'typeorm';

const POSTGRES_CONFIGURATION_SCHEMA = Joi.object({
  DB_TYPE: Joi.string().default('postgres'),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default('5432'),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_SCHEMA: Joi.string().optional(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_RETRY_ATTEMPTS: Joi.number().default(0),
  TYPEORM_LOGGING: Joi.bool().default(true),
});

export const TypeOrmConfiguration: () => TypeOrmModuleOptions = () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  schema: process.env.POSTGRES_SCHEMA,
  database: process.env.POSTGRES_DB,
  retryAttempts: Number(process.env.POSTGRES_RETRY_ATTEMPTS) ?? 0,
  logging: JSON.parse(process.env.TYPEORM_LOGGING ?? '{}'),
  synchronize: false,
  autoLoadEntities: true,
});

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private isTest(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  private isProd(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  private getPostgresConfiguration(): TypeOrmModuleOptions {
    const POSTGRES_CONFIGURATION = TypeOrmConfiguration();
    if (!POSTGRES_CONFIGURATION_SCHEMA.validate(POSTGRES_CONFIGURATION)) {
      throw new Error('PG configuration invalid');
    }

    return {
      ...POSTGRES_CONFIGURATION,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    };
  }

  private getSqliteConfiguration(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: './data/test.sqlite',
      autoLoadEntities: true,
      logging: false,
      synchronize: this.isTest(),
      dropSchema: this.isTest(),
    };
  }

  createTypeOrmOptions() {
    if (this.isTest()) {
      return this.getSqliteConfiguration();
    }

    return this.getPostgresConfiguration();
  }
}
