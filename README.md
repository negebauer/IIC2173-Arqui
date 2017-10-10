# Arquiyalt

[![circleciB]][circleciL]
[![commitsB]][commitsL]

## Table Of Contents

- [Structure](#structure)
- [Deploy](#deploy)
- [Links](#links)

## Structure

|folder|content|
|:----:|:-----:|
|[api](api)|Our own [koa](http://koajs.com) api. Comunicates with the central api|
|[docker](docker)|Docker deploy configuration|
|[email](email)|Email client|
|[queue](queue)|Order queue client|
|[web](web)|[Angular 2](https://angular.io) web client|

## Deploy

Current deploy stack consists of a single machine that executes a `docker-compose` version of the full app

http://arqss2.ing.puc.cl

***

#### Links

- commits
  - https://conventionalcommits.org
  - https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
- docker
  - https://docs.docker.com/get-started
  - https://docs.docker.com/engine/installation/linux
  - https://docs.docker.com/compose/gettingstarted
  - http://blog.mpayetta.com/node.js/docker/mongodb/2016/09/04/dockerizing-node-mongo-app/
- mongodb
  - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu
  - https://docs.mongodb.com/manual/replication
- circleci
  - https://circleci.com/docs/2.0/custom-images
  - https://circleci.com/docs/2.0/building-docker-images/
  - https://circleci.com/docs/2.0/high-availability
- ubuntu ports
  - https://superuser.com/questions/769541/is-it-possible-to-ping-an-addressport
  - https://www.digitalocean.com/community/questions/how-do-i-open-ports-on-an-ubuntu-server
- angular docker: https://github.com/dciccale/angular-docker-boilerplate

<!-- Badges -->
[circleciL]:https://circleci.com/gh/negebauer/IIC2173-Arqui
[circleciB]:https://circleci.com/gh/negebauer/IIC2173-Arqui.svg?style=svg&circle-token=3634a4c1bb42fd24fb638af8b3d05a1f114789f6

[commitsL]:https://conventionalcommits.org
[commitsB]:https://img.shields.io/badge/commits-conventional-brightgreen.svg
