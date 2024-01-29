FROM node:alpine As Development

WORKDIR /usr/src/app/

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i

COPY apps/gateway apps/gateway

COPY tsconfig.json tsconfig.json

COPY nest-cli.json nest-cli.json

COPY libs libs


RUN pnpm run build gateway

FROM node:alpine as Production

ARG NODE_ENV=production
ENV NODE_ENV = ${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/apps/gateway/main"]
