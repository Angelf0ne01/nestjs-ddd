import { getLogLevels } from '../get-log-level';

describe('getLogLevels function', () => {
  it('should return an array of log levels up to the configured level', () => {
    const originalLogLevel = process.env.LOG_LEVEL;
    process.env.LOG_LEVEL = 'warn';

    const result = getLogLevels();

    expect(result).toEqual(['error', 'warn']);

    process.env.LOG_LEVEL = originalLogLevel;
  });

  it('should return all log levels when LOG_LEVEL is not set', () => {
    const originalLogLevel = process.env.LOG_LEVEL;
    delete process.env.LOG_LEVEL;

    const result = getLogLevels();

    expect(result).toEqual(['error', 'warn', 'log', 'debug', 'verbose']);

    process.env.LOG_LEVEL = originalLogLevel;
  });

  it('should return all log levels when LOG_LEVEL is set to an invalid value', () => {
    const originalLogLevel = process.env.LOG_LEVEL;
    process.env.LOG_LEVEL = 'invalid';

    const result = getLogLevels();

    expect(result).toEqual(['error', 'warn', 'log', 'debug', 'verbose']);

    process.env.LOG_LEVEL = originalLogLevel;
  });
});
