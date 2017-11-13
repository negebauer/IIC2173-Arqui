FROM node:8-alpine

WORKDIR /queue

COPY package.json .
RUN yarn --production=true --frozen-lockfile --non-interactive

COPY . .

CMD ["yarn", "start"]
