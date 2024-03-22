module.exports = {
  './**/*.{css,js,ts,tsx}': ['prettier --write'],
  './**/*.{ts,tsx}': () => ['yarn lint', 'yarn typescript'],
  './**/*.test.{ts,tsx}': () => ['yarn test:related'],
  './**/*.e2e.spec.{ts,tsx}': () => ['yarn test:e2e:related'],
}
