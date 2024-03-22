process.env.EMAIL_FROM = 'test@test.com';

jest.mock('@shared/entities/distributors/domain/auth', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,unicorn/prefer-module
  const mockedAuthModule = require('@shared/entities/distributors/domain/__mocks__/auth');
  return {
    __esModule: true,
    ...mockedAuthModule,
    Auth: jest.fn().mockImplementation(() => ({
      toPrimitive: jest.fn(),
      fromEntity: jest.fn(),
      getLink: jest.fn(),
    })),
  };
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
beforeAll(async () => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
afterAll(async () => {});
