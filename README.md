# Arquiyalt

[![circleciB]][circleciL]
[![telegramBotB]][telegramBotL]
[![gitflowB]][gitflowL]
[![commitsB]][commitsL]
[![standard-versionB]][standard-versionL]

## Table Of Contents

- [Project structure](#project-structure)
- [Deploy](#deploy)
- [Development](#development)
- [References](#references)

## Project structure

|folder|content|
|:----:|:-----:|
|[.circleci](.circleci)|Continuous integration using [Circle CI](https://circleci.com/gh/negebauer/IIC2173-Arqui)|
|[api]|Our own [koa] api. Comunicates with the central api|
|[docker]|Docker deploy configuration|
|[email]|Email client ([koa], [nodemailer] and [mail-notifier])|
|[pdf]|The course project's pdfs|
|[queue]|Order queue client ([koa] and [kue])|
|[queue-visualizer]|Order queue visualizer ([kue])|
|[scripts]|Scripts for running locally and performing tasks|
|[telegram]|Our telegram bot using [bot-brother](https://github.com/SerjoPepper/bot-brother)|
|[web]|[Angular 2](https://angular.io) web client|

[api]:api
[docker]:docker
[email]:email
[pdf]:pdf
[queue]:queue
[queue-visualizer]:queue-visualizer
[scripts]:scripts
[telegram]:telegram
[web]:web

[koa]:http://koajs.com
[kue]:http://automattic.github.io/kue/
[nodemailer]:https://nodemailer.com/about/
[mail-notifier]:https://github.com/jcreigno/nodejs-mail-notifier

## Deploy

The app is deployed in a [docker swarm] on the arqss machines

All the following links _should_ work

- http://arqss2.ing.puc.cl
- http://arqss7.ing.puc.cl
- http://arqss11.ing.puc.cl
- http://arqss12.ing.puc.cl
- http://arqss13.ing.puc.cl

[docker swarm]:https://docs.docker.com/engine/swarm

**Important routes**

|route|content|
|:-:|:-:|
|http://arqss2.ing.puc.cl |The [web] app|
|http://arqss2.ing.puc.cl/api/ |Our [api]|
|http://arqss2.ing.puc.cl/queue/ |Our [queue]|
|http://arqss2.ing.puc.cl/v/ |A swarm visualizer|
|http://arqss2.ing.puc.cl/qv/ |Our [queue-visualizer] for the queue|
|http://arqss2.ing.puc.cl/admin?stats |HAProxy stats (user: u, pass: p)|

## Development

Working with the whole project locally is easy.  
All you need is [docker] and [docker-compose] and then run the following:

```bash
# Builds docker images from source
# Runs those images
bash scripts/run.sh
```

This runs the app in the following urls

|URL|app|
|:-:|:-:|
|http://localhost:3000|[api]|
|http://localhost:3001|[email]|
|http://localhost:3002|[queue]|
|http://localhost:3003|[queue-visualizer]|
|http://localhost:8080|[web]|

Other available commands

```bash
bash scripts/stop.sh              # Stop the project docker containers
bash scripts/cleancontainers.sh   # Remove all docker containers
bash scripts/cleanimages.sh       # Remove all docker containers and images
```

[docker]:https://www.docker.com
[docker-compose]:https://docs.docker.com/compose/

***

#### References

- commits
  - https://conventionalcommits.org
  - https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
  - https://github.com/conventional-changelog/standard-version
- docker
  - https://docs.docker.com/get-started
  - https://docs.docker.com/engine/installation/linux
  - https://docs.docker.com/compose/gettingstarted
  - http://blog.mpayetta.com/node.js/docker/mongodb/2016/09/04/dockerizing-node-mongo-app/
- mongodb
  - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu
  - https://docs.mongodb.com/manual/replication
- mongo + docker swarm
   - https://github.com/vasetech/mongo-rs-ctrl
   - https://medium.com/lucjuggery/mongodb-replica-set-on-swarm-mode-45d66bc9245
- circleci
  - https://circleci.com/docs/2.0/custom-images
  - https://circleci.com/docs/2.0/building-docker-images/
  - https://circleci.com/docs/2.0/high-availability
- ubuntu ports
  - https://superuser.com/questions/769541/is-it-possible-to-ping-an-addressport
  - https://www.digitalocean.com/community/questions/how-do-i-open-ports-on-an-ubuntu-server
- angular docker: https://github.com/dciccale/angular-docker-boilerplate
- distroless images: https://github.com/GoogleCloudPlatform/distroless
- proxy:
  - http://proxy.dockerflow.com/swarm-mode-stack/
  - https://github.com/popomore/koa-proxy
  - https://github.com/nodejitsu/node-http-proxy
  - https://github.com/docker/dockercloud-haproxy
  - https://github.com/jwilder/nginx-proxy
- ssl certificate:
  - http://proxy.dockerflow.com/certs/
  - https://finnian.io/blog/ssl-with-docker-swarm-lets-encrypt-and-nginx/

<!-- Badges -->

[circleciL]:https://circleci.com/gh/negebauer/IIC2173-Arqui
[circleciB]:https://circleci.com/gh/negebauer/IIC2173-Arqui/tree/master.svg?style=svg&circle-token=13d482e124498647c8fd561b476976d460b175f4

[gitflowL]:https://datasift.github.io/gitflow/IntroducingGitFlow.html
[gitflowB]:https://img.shields.io/badge/git-flow-brightgreen.svg

[commitsL]:https://conventionalcommits.org
[commitsB]:https://img.shields.io/badge/commits-conventional%20commits-blue.svg

[standard-versionL]:https://github.com/conventional-changelog/standard-version
[standard-versionB]:https://img.shields.io/badge/version-standar%20version-blue.svg

[telegramBotL]:https://t.me/iic2173_arqui_g1_bot
[telegramBotB]:https://img.shields.io/badge/%20-bot-blue.svg?logo=telegram&style=social
