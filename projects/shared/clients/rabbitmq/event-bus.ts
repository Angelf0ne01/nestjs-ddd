import { DomainEvent } from '@shared/common/domain/domain-event';
import { Options } from 'amqplib';

export interface EventBus {
  publish<T>(
    msg: T,
    exchange?: string,
    routerKey?: string,
    meta?: unknown,
    options?: Options.Publish,
  ): void;
  publisWithOutFormat<T>(
    msg: T,
    exchange?: string,
    routerKey?: string,
    meta?: unknown,
    options?: Options.Publish,
  ): void;
  publishs(events: Array<DomainEvent>): void;
  getMessage(): unknown;
}
