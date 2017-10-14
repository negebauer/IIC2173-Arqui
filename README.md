# Arquiyalt

[![circleciB]][circleciL]
[![gitflowB]][gitflowL]
[![commitsB]][commitsL]

## Table Of Contents

- [Project structure](#project-structure)
- [Deploy](#deploy)
- [References](#references)

## Project structure

|folder|content|
|:----:|:-----:|
|[.circleci](.circleci)|Continuous integration using [Circle CI](https://circleci.com/gh/negebauer/IIC2173-Arqui)|
|[api](api)|Our own [koa](http://koajs.com) api. Comunicates with the central api|
|[docker](docker)|Docker deploy configuration|
|[email](email)|Email client|
|[queue](queue)|Order queue client|
|[web](web)|[Angular 2](https://angular.io) web client|

## Deploy

The app is deployed in a docker swarm on the arqss machines

All the following links _should_ work

- http://arqss2.ing.puc.cl
- http://arqss7.ing.puc.cl
- http://arqss11.ing.puc.cl
- http://arqss12.ing.puc.cl
- http://arqss13.ing.puc.cl

**Important routes**

|route|content|
|:-:|:-:|
|http://arqss2.ing.puc.cl |The [web](web) app|
|http://arqss2.ing.puc.cl/api/ |Our [api](api)|
|http://arqss2.ing.puc.cl/v/ |A swarm visualizer|
|http://arqss2.ing.puc.cl/admin?stats |HAProxy stats (user: u, pass: p)|

***

#### References

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

<!-- Badges -->

[circleciL]:https://circleci.com/gh/negebauer/IIC2173-Arqui
[circleciB]:https://circleci.com/gh/negebauer/IIC2173-Arqui.svg?style=svg&circle-token=3634a4c1bb42fd24fb638af8b3d05a1f114789f6

[gitflowL]:https://datasift.github.io/gitflow/IntroducingGitFlow.html
[gitflowB]:https://img.shields.io/badge/git-flow-brightgreen.svg

[commitsL]:https://conventionalcommits.org
[commitsB]:https://img.shields.io/badge/commits-conventional-brightgreen.svg
