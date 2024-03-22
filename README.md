# RM Books Service

## Arquitectura

## Arquitectura del codigo

![api](/uploads/fc562c42b50061c10082c3e4cdd22b10/image.png)

- controllers: Contienen los módulos lógicos encargados de resolver las peticiones.
  - example: Cada controlador parte de un encarpetado con la siguiente estructura
    - example.controller.ts: Posee la declaración de todos los metodos u/o endpoints del servicio en el caso de que el mismo opte por hacer uso de una API REST. Este archivo es prescindible si el servicio solo expone las acciones a través de graphql.
    - example.service.ts: Conocido en otras arquitectura como use-cases, posee toda la logica pura utilizada en las acciones de nuestro modulo.
    - example.module.ts: Archivo utilizado por nestJS para exponer un grupo de archivos como un unico modulo a nuestro archivo principal.
    - example.resolver.ts: Posee la declaración de los resolvers de las queries y/o mutations de nuestro servicio, explicitamente utilizado en el ambito de graphql. Este archivo es prescindible si el servicio solo expone las acciones a través de API Rest.
- configurations:
  - index.ts: Archivo encargado de la configuración principal del servicio.
  - swagger.ts: Archivo encargado de la configuración de la documentación del api en swagger.
- core:
  - clients: Carpeta contenedora de los archivos de configuración de los distintos clientes de nuestro servicio. Estos clientes deben ser instanciados utilizando el patrón singleton y deben poder servir como única referencia de uso a lo largo de todo el servicio.
  - dtos: Carpeta contenedora de los modelos de respuestas de las acciones del servicio

## Shared

Es una repositorio local de elementos comunes entre el código de la api y su worker. La estructura actual es la siguiente:

- abstracts: Engloba todos los modelos de implementación de las distintas clases y/o funciones utilizadas en los servicios sin ser directamente la implementación final.
- entities: Engloba todas las entidades de nuestro servicio. A.K.A Interfaces & Types.
- utils: Engloba funciones utilitarias utilizadas en ambas partes del servicio.

## Worker

![worker](/uploads/876585946cf1fb4d3a2edbe0512624d1/image.png)

- events: Contienen los módulos lógicos encargados de resolver los eventos del servicio.
  - example: Cada **event** parte de un encarpetado con la siguiente estructura
    - example.controller.ts: Posee la declaración de todos los metodos de resolución para cada evento del servicio.
    - example.service.ts: Conocido en otras arquitectura como use-cases, posee toda la logica pura utilizada en las acciones de nuestro modulo.
    - example.module.ts: Archivo utilizado por nestJS para exponer un grupo de archivos como un unico modulo a nuestro archivo principal.
- configurations:
  - index.ts: Archivo encargado de la configuración principal del servicio.
- core:
  - clients: Carpeta contenedora de los archivos de configuración de los distintos clientes de nuestro servicio. Estos clientes deben ser instanciados utilizando el patrón singleton y deben poder servir como única referencia de uso a lo largo de todo el servicio.

## Requisitos para desarrollo

- RabbitMQ
- > = Node v16
- yarn
- docker & docker-compose

Previo a levantar el servicio es importante tener instalado los paquetes, en este servicio se realiza con yarn(recomendacion, ejecutar el yarn i dentro de cada packages), luego de poseer todo instalado, levantar el rabbitmq definido en el archivo docker-compose.yml, esto se puede hacer en la ruta del proyecto con el comando `docker-compose up -d`, una vez este levantado, deberiamos poder ingresar a la ui `http://localhost:15672` con el usuario y contraseña definida, se debe crear el exchange `xapi.events` de tipo topic y es ahi donde luego realizaremos los bindings correspondientes.

Por defecto se espera la existencia de la cola `xapi.unprocessed.events` y `xapi.unprocesasble.events` con un binding con el mismo topic en el exchange `xapi.events`

## Variables de entorno

```
APP_NAME=skeleton-service
ENV=development
JWT_SECRET= #aca cambia segun el entorno

AMQP_USER= #usuario de rabbitmq
AMQP_PASS= #contraseña del usuario de rabbitmq
AMQP_HOST= #uso local, 0.0.0.0
AMQP_PORT=5672
```

## Comandos

### Comandos globales

Estos comandos se ejecutan en la raiz del proyecto y son gobernados actualmente por lerna.

- `yarn build`
- `yarn format`
- `yarn lint`
- `yarn release`
- `yarn swagger`
- `yarn test`
- `yarn test:e2e`
- `yarn test:cov`

### Comandos @skeleton-service/api

- `yarn start`
- `yarn start:dev`
- `yarn build`
- `yarn start:prod`

### Comandos @skeleton-service/worker

- `yarn start`
- `yarn start:dev`
- `yarn build`
- `yarn start:prod`
