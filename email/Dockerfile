FROM node:8-alpine

WORKDIR /email

RUN apk add --update git

COPY package.json .
RUN yarn --production=true --frozen-lockfile --non-interactive

COPY . .

ENV PORT 80
EXPOSE 80

CMD ["yarn", "start"]
