# FROM node:8.6
FROM mhart/alpine-node:latest

WORKDIR /api

COPY package.json /tmp/package.json
RUN cd /tmp && yarn
RUN cp -a /tmp/node_modules .

COPY . .

ENV PORT 80
EXPOSE 80

CMD ["yarn", "start"]
