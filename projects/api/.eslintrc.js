module.exports = {
  extends: '../../.eslintrc.js',
  parserOptions: {
    project: './tsconfig.build.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    '@darraghor/nestjs-typed/injectable-should-be-provided': [
      'error',
      {
        src: ['src/**/*.ts'],
        filterFromPaths: ['node_modules', '.test.', '.spec.'],
      },
    ],
  },
};
