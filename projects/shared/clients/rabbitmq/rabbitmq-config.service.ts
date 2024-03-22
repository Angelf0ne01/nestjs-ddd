import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class RabbitmqConfigService
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(private config: ConfigService) {}

  createModuleConfig(): RabbitMQConfig {
    return {
      uri: this.getUri(),
      exchanges: [
        {
          name: 'skeleton_service.events',
          type: 'topic',
        },
      ],
      connectionInitOptions: { wait: false },
      deserializer: msg => {
        try {
          // Intenta parsear el mensaje como JSON
          const jsonMessage = JSON.parse(msg.toString());

          // Si se pudo parsear correctamente, devuelve el objeto JSON tal cual
          return jsonMessage;
        } catch {
          // Si no se pudo parsear como JSON, crea un objeto con una propiedad "data"
          // y asigna el contenido del mensaje como el valor de "data"
          return { data: msg.toString() };
        }
      },
    };
  }

  getUri() {
    const host = process.env.AMQP_HOST || '';
    const port = process.env.AMQP_PORT || '';
    const user = process.env.AMQP_USER || '';
    const pass = process.env.AMQP_PASS || '';

    return `amqp://${user}:${pass}@${host}:${port}`;
  }
}
