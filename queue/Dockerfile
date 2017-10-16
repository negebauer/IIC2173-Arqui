FROM node:8-alpine

WORKDIR /queue

COPY package.json .
RUN yarn --production=true --frozen-lockfile --non-interactive

COPY . .

ENV PORT 80
ENV KUE_PORT 81

EXPOSE 80
EXPOSE 81

CMD ["yarn", "start"]
