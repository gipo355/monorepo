# nest-pino-logger

Work in progress

Ready made Pino logger for NestJS

includes multi stream transports with pino-loki

## Loki

uses `pino-loki` requires loki promtail and grafana

_example docker-compose.yml_

```dockerfile
version: '3.9'
services:
  loki:
    image: grafana/loki:3.0.0
    # profiles: [full]
    ports:
      - '3100:3100'
    command: -config.file=/etc/loki/local-config.yaml
  promtail:
    # profiles: [full]
    image: grafana/promtail:3.0.0
    volumes:
      - /tmp/loki/promtail/var/log:/var/log
    command: -config.file=/etc/promtail/config.yml
  grafana:
    # profiles: [full]
    environment:
      - GF_PATHS_PROVISIONING=/etc/grafana/provisioning
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
    entrypoint:
      - sh
      - -euc
      - |
        mkdir -p /etc/grafana/provisioning/datasources
        cat <<EOF > /etc/grafana/provisioning/datasources/ds.yaml
        apiVersion: 1
        datasources:
        - name: Loki
          type: loki
          access: proxy
          orgId: 1
          url: http://loki:3100
          basicAuth: true
          isDefault: true
          version: 1
          editable: false
        EOF
        /run.sh
    image: grafana/grafana:latest
    ports:
      - '127.0.0.1:3200:3000'
```

## Pretty

uses `pino-pretty`

## Installation

```bash
npm install --save @gipo355/nest-pino-logger
```

## Usage

```ts
// main.ts
const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  bufferLogs: true,
});

app.useLogger(app.get(PinoLoggerService));
```

```ts
// app.module
import { PinoLoggerModule } from '@gipo355/nest-pino-logger';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PinoLoggerModule.forRoot({
            pino: {
                pretty: false,
                loki: {
                    host: 'http://localhost:3100',
                    batching: false,
                    basicAuth: {
                        username: '',
                        password: '',
                    },
                    labels: {
                        application: 'nest-pass',
                        http: 'http://localhost:3000',
                    },
                },
            },
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
```

```ts
// app.service
constructor(
    private readonly appService: AppService,
    private readonly logger: PinoLoggerService
) {}
```

## TODO

- allow choosing levels
- be clear about when and what is logging to stdout
- allow choosing file or adding remote transport
- improve documentation
