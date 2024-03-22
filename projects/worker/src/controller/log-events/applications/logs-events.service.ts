/* eslint-disable @typescript-eslint/no-explicit-any */
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { DomaintEvent } from '@shared/clients/rabbitmq/domain-events';

export class LogEventWorkerService {
  @RabbitSubscribe({
    exchange: 'skeleton_service.events',
    routingKey: 'company.skeleton_service.#',
    queue: 'skeleton_service_logs_events',
  })
  public async run(event: DomaintEvent<any>) {
    // eslint-disable-next-line no-console
    console.log("[log]",event.data.attributes);
  }
}
