import { FakeMessagingService } from '@shared/clients/rabbitmq/testing';
import { DomainEvent } from '@shared/common/domain/domain-event';

class DomainEventTest extends DomainEvent {
  static readonly EVENT_NAME: string = 'conversation.created';

  toPrimitives() {
    return this;
  }
  constructor(
    readonly id: string,
    readonly eventName: string,
  ) {
    super({
      eventName: eventName,
      aggregateId: id,
      occurredOn: new Date(),
    });
  }
}
describe('FakeMessagingService', () => {
  let messagingService: FakeMessagingService;

  beforeEach(() => {
    messagingService = new FakeMessagingService();
  });

  afterEach(() => {
    FakeMessagingService.clear();
  });

  it('should publish a message', () => {
    const message = 'Hello, world!';
    messagingService.publish(message);
    const receivedMessage = messagingService.getMessage();
    expect(receivedMessage).toBe(message);
  });

  it('should publish an array of DomainEvents', () => {
    const domainEvents = [
      new DomainEventTest('id-1', 'event-1'),
      new DomainEventTest('id-2', 'event-2'),
    ];
    messagingService.publishs(domainEvents);
    const receivedEvents = [];
    while (Boolean) {
      const event = messagingService.getMessage();
      if (event) {
        receivedEvents.push(event);
      } else {
        break;
      }
    }
    expect(receivedEvents).toEqual(domainEvents);
  });

  it('should clear the messages', () => {
    const domainEvents = [
      new DomainEventTest('id-1', 'event-1'),
      new DomainEventTest('id-2', 'event-2'),
    ];
    messagingService.publishs(domainEvents);
    FakeMessagingService.clear();
    const receivedMessage = messagingService.getMessage();
    expect(receivedMessage).toBeUndefined();
  });
});
