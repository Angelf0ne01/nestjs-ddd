import * as Sentry from '@sentry/node';
import type { Router } from 'express';

export function SentryInitSDK<T extends Router>(app?: T) {
  if (process.env.SENTRY_DSN && process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.ENV ?? 'development',
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({
          app,
        }),
        ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
      ],
      tracesSampleRate: Number(process.env.SENTRY_TRACING_SAMPLE_RATE ?? '0.1'),
      profilesSampleRate: Number(
        process.env.SENTRY_PROFILING_SAMPLE_RATE ?? '0.1',
      ),
    });
  }
}

export default Sentry;
