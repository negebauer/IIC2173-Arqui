FROM mhart/alpine-node:latest

WORKDIR /web

COPY package.json .
RUN yarn

COPY . .

ENV PORT 80
EXPOSE 80

CMD ["yarn", "start"]
