# Arquiyalt Docker

## Table Of Contents

- [Docker files](#docker-files)
- [Dev deploy](#dev-deploy)
- [Swarm deploy](#swarm-deploy)
  - [Update service](#update-service)
- [Other commands](#other-commands)
  - [Services](#services)
- [Scripts](#scripts)
- [Contributors](#contributors)

## Docker files

|file|use|
|:--:|:-:|
|[docker-compose.yml](docker-compose.yml)|Run the full app in a single machine. For dev (run in your machine) and tests|
|[docker-compose-stack.yml](docker-compose-stack.yml)|Run the app in arqss swarm|

## Dev deploy

Use `docker-compose` to deploy the full app in a single machine for testing

```bash
docker-compose build    # Build images
docker-compose up -d    # Run them
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
Number of services updated in parallel is defined in the stack file

## Other commands

#### Services

```bash
docker container ls
```

## Scripts

Config and helpers scripts can be found in the [scripts](scripts) folder

|script|use|
|:--:|:--:|
|[createDbFolder.sh](scripts/createDbFolder.sh)|(**DON'T RUN**) Create database folders for volume mount|
|[dockerMachine.sh](scripts/dockerMachine.sh)|(**DON'T RUN**) Configure docker-machine with all arqss machines|
|[installDocker.sh](scripts/installDocker.sh)|Install docker, docker-compose and docker-machine on all arqss machines|
|[removeNginx.sh](scripts/removeNginx.sh)|Remove nginx from all arqss machines|

***

## Contributors:

- [@negebauer](https://github.com/negebauer)
- [@andersskog](https://github.com/andersskog)
