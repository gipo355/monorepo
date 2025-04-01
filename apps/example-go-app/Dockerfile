# Build the docker image with `npx nx docker-build example-express-app`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t example-express-app`.
FROM docker.io/golang:alpine@sha256:7772cb5322baa875edd74705556d08f0eeca7b9c4b5367754ce3f2f00041ccee as builder

LABEL org.opencontainers.image.source=https://github.com/gipo355/example-go-app

# TODO: ENV vars for production usage if not using infisical

ENV HOST=0.0.0.0
ENV PORT=3000

ENV REDIS_HOST=default
ENV REDIS_PORT=6379
ENV REDIS_PASSWORD=default
ENV REDIS_USERNAME=default

ENV MONGO_STRING=default

ENV CSRF_SECRET=default
ENV SESSION_SECRET=default
ENV JWT_SECRET=default
ENV COOKIE_SECRET=default

ENV UV_THREADPOOL_SIZE=4
ENV SENTRY_DSN=''
ENV ENABLE_LOKI='false'
ENV ENABLE_RATE_LIMITER='true'
ENV RATE_LIMITER_POINTS=100
ENV RATE_LIMITER_DURATION=3600
ENV EXPRESS_TRUST_NUMBER_OF_PROXIES = 0

WORKDIR /app

RUN addgroup --system example-go-app && \
  adduser --system -G example-go-app example-go-app

COPY dist/apps/example-go-app example-go-app
RUN chown -R example-go-app:example-go-app .

# install infisical cli
# can inject secrets into env
# RUN apk add --no-cache bash curl
# RUN curl -1sLf \
#   'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' \
#   | bash
# RUN apk update && apk add infisical

EXPOSE ${PORT}

# CMD [ "infisical run -- ", "./example-go-app/server" ]
CMD [ "./example-go-app/server" ]
