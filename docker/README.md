# Arquiyalt Docker

## Table Of Contents

- [Docker files](#docker-files)
- [Dev deploy](#dev-deploy)
- [Swarm deploy](#swarm-deploy)
  - [Update service](#update-service)
- [Other commands](#other-commands)
  - [Services](#services)
- [Scripts](#scripts)

## Docker files

|file|use|
|:--:|:-:|
|[docker-compose.yml](docker-compose.yml)|Run the full app in a single machine. For dev (run in your machine) and tests|
|[docker-compose-stack.yml](docker-compose-stack.yml)|Run the app in arqss swarm|

## Dev deploy

Use `docker-compose` to deploy the full app in a single machine for testing

```bash
docker-compose up -d docker-compose.yml
```

## Swarm deploy

Use `docker stack deploy` to deploy the app in a [docker swarm](https://docs.docker.com/engine/swarm/) manager node

```bash
# Initialize swarm in a node
docker swarm init
# Use provided command to join
# other nodes into swarm

# Create network for the stack
docker network create --driver overlay proxy
# Deploy the stack
docker stack deploy -c docker-compose-stack.yml arqui
```

To unmount the stack and the swarm

```bash
docker stack rm arqui
docker network rm proxy
docker swarm leave --force
```

#### Update service

If a new version of a service image is available we can update it

```bash
docker service update --image <image> <service>
```

This will update one service task at a time, reducing downtime

## Other commands

#### Services

```bash
docker container ls
```

## Scripts

|script|use|
|:--:|:--:|
|[zcreateDbFolder.sh](zcreateDbFolder.sh)|(**DON'T RUN**) Configure docker-machine with all arqss machines|
|[zdockerMachine.sh](zdockerMachine.sh)|(**DON'T RUN**) Configure docker-machine with all arqss machines|
|[zinstallDocker.sh](zinstallDocker.sh)|Install docker, docker-compose and docker-machine on all arqss machines|
|[zremoveNginx.sh](zremoveNginx.sh)|Remove nginx from all arqss machines|
