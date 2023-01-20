FROM node as builder

WORKDIR /app

COPY . .

RUN yarn install-dep

RUN yarn build

FROM node:lts-alpine

WORKDIR /app

COPY server/package*.json /app/

RUN yarn install --only=production

COPY --from=builder /app/server/dist /app/dist
COPY --from=builder /app/server/public /app/public

COPY server/.env /app

EXPOSE 8000

CMD ["yarn", "deploy"]