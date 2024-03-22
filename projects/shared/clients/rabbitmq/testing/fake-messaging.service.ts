import { DomainEvent } from '@shared/common/domain/domain-event';
import { EventBus } from '../event-bus';

// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class FakeMessagingService implements EventBus {
  static messages: unknown[] = [];

  publish<T>(msg: T) {
    return FakeMessagingService.messages.push(msg);
  }

  publisWithOutFormat<T>(msg: T) {
    return FakeMessagingService.messages.push(msg);
  }

  publishs(events: Array<DomainEvent>) {
    for (const event of events) {
      FakeMessagingService.messages.push(event);
    }
  }

  getMessage() {
    return FakeMessagingService.messages.shift();
  }

  static clear() {
    FakeMessagingService.messages = [];
  }
}
