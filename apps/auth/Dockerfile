FROM node:alpine As Development

WORKDIR /usr/src/app/

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i

COPY . .

RUN pnpm run build

FROM node:alpine as Production

ARG NODE_ENV=production
ENV NODE_ENV = ${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/apps/auth/main"]
