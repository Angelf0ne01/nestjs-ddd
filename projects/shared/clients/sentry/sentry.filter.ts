import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import Sentry from './sentry.client';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    Sentry.captureException(exception);
    const type = host.getType();
    if (type === 'http') {
      return super.catch(exception, host);
    } else {
      throw exception;
    }
  }
}
