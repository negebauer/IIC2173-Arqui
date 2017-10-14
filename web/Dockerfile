FROM mhart/alpine-node:latest as builder

WORKDIR /web

COPY package.json .
RUN yarn --production=true --frozen-lockfile --non-interactive

COPY . .

# Check dockerEnv if declaring more env
# variables that will be defined on runtime
ENV API DOCKER_ENV_API

RUN yarn build

FROM mhart/alpine-node:latest

COPY --from=builder /web/dist dist
COPY --from=builder /web/serveInjected.sh .

RUN npm i -g serve

ENV PORT 80
EXPOSE 80

CMD ["sh", "serveInjected.sh"]
