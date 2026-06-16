FROM node:25-alpine AS client-builder
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    echo '//npm.pkg.github.com/:_authToken='$(cat /run/secrets/NODE_AUTH_TOKEN) >> .npmrc
RUN npm ci
COPY client .

ARG CLUSTER
ENV CLUSTER ${CLUSTER}

RUN npm run && npm run build

FROM node:25-alpine AS server-builder
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN) \
    npm ci
COPY server .
RUN npm run && npm run build

FROM node:25-alpine AS server-dependencies
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm install --omit=dev

FROM gcr.io/distroless/nodejs24-debian13 AS runtime

WORKDIR /app

ENV NODE_ENV=production
EXPOSE 3000

COPY --from=client-builder /app/dist ./client/dist
COPY --from=server-builder /app/dist ./server/dist

WORKDIR /app/server

COPY --from=server-dependencies /app/node_modules ./node_modules

CMD [ "dist/server.js" ]
