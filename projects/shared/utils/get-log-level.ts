type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];

export const getLogLevels: () => LogLevel[] = () => {
  const maxLogLevel = logLevels.includes(process.env.LOG_LEVEL as LogLevel)
    ? logLevels.indexOf(process.env.LOG_LEVEL as LogLevel) + 1
    : logLevels.length;

  return logLevels.slice(0, maxLogLevel);
};
