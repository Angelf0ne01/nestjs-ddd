import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { DomainEvent } from '@shared/common/domain/domain-event';
import { Options } from 'amqplib';
import { v4 as uuid } from 'uuid';
import { DomaintEvent, MetaType } from './domain-events';
import { EventBus } from './event-bus';

@Injectable()
export class MessagingService implements EventBus {
  constructor(private amqp: AmqpConnection) {}

  publish<T>(
    msg: T,
    exchange = 'amq.fanout',
    routingKey = '',
    metaData: MetaType,
    options?: Options.Publish,
  ) {
    try {
      if (this.amqp.connected) {
        const payload: DomaintEvent<T> = {
          data: {
            id: uuid(),
            type: routingKey,
            occurred_on: new Date(),
            attributes: msg,
            meta: {
              ...metaData,
            },
          },
        };

        this.amqp.publish(exchange, routingKey, payload, options);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  publisWithOutFormat<T>(
    msg: T,
    exchange = 'amq.fanout',
    routingKey = '',
    metaData?: MetaType,
    options?: Options.Publish,
  ) {
    try {
      if (this.amqp.connected) {
        this.amqp.publish(
          exchange,
          routingKey,
          Buffer.from(JSON.stringify(msg)),
          options,
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
  publishs(events: Array<DomainEvent>) {
    for (const event of events) {
      try {
        const routingKey = event.eventName;
        const exchange = 'skeleton_service.events';
        const content = this.toBuffer(event);
        const options = this.options(event);

        this.amqp.publish(exchange, routingKey, content, options);
      } catch {
        //await this.failoverPublisher.publish(event);
      }
    }
  }

  getMessage(): unknown {
    return '';
  }

  private options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: `utf-8`,
    };
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = JSON.stringify({
      data: {
        id: event.eventId,
        eventName: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        aggregateId: event.aggregateId,
        attributes: event.toPrimitives(),
        meta: event.metadata,
      },
    });
    return Buffer.from(eventPrimitives);
  }
}
