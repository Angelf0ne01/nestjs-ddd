module.exports = {
  extends: '../../.eslintrc.js',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    '@darraghor/nestjs-typed/injectable-should-be-provided': [
      'error',
      {
        src: ['**/*.ts'],
        filterFromPaths: ['node_modules', '.test.', '.spec.'],
      },
    ],
  },
};
