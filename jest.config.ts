import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  roots: ['<rootDir>/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/projects/**/**/*.ts',
    '!<rootDir>/projects/**/**/*.e2e.spec.ts',
    '!<rootDir>/projects/**/**/*test.ts',
    '!<rootDir>/**/**/jest-e2e.setup.ts',
    '!<rootDir>/**/**/main.ts',
    '!<rootDir>/**/**/*.module.ts',
    '!<rootDir>/**/**/swagger.ts',
    '!<rootDir>/**/**/dist/**/*',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleFileExtensions: ['ts', 'js'],
  coverageReporters: ['json', 'lcov', 'html'],
  projects: [
    {
      displayName: 'API-UNIT',
      testEnvironment: 'node',
      transform: {
        '^.+\\.(ts|tsx)$': '@swc/jest',
      },
      clearMocks: true,
      resetMocks: true,
      testMatch: ['<rootDir>/projects/api/**/*.test.ts'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
    {
      displayName: 'API-E2E',
      testEnvironment: 'node',
      transform: {
        '^.+\\.(ts|tsx)$': '@swc/jest',
      },
      clearMocks: true,
      resetMocks: true,
      setupFilesAfterEnv: ['<rootDir>/projects/api/jest-e2e.setup.ts'],
      testMatch: ['<rootDir>/projects/api/**/*.e2e.spec.ts'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
    {
      displayName: 'SHARED',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      clearMocks: true,
      resetMocks: true,
      testMatch: ['<rootDir>/projects/shared/**/*test.ts'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
    {
      displayName: 'WORKER',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      clearMocks: true,
      resetMocks: true,
      testMatch: ['<rootDir>/projects/worker/**/*test.ts'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
    {
      displayName: 'WORKER-E2E',
      testEnvironment: 'node',
      transform: {
        '^.+\\.(ts|tsx)$': '@swc/jest',
      },
      clearMocks: true,
      resetMocks: true,
      setupFilesAfterEnv: ['<rootDir>/projects/worker/jest-e2e.setup.ts'],
      testMatch: ['<rootDir>/projects/worker/**/*.e2e.spec.ts'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  ],
};

export default config;
