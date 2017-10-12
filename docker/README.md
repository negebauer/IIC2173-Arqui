# Arquiyalt Docker

## Table Of Contents

- [Docker files](#docker-files)
- [Local deploy](#local-deploy)
- [Stack deploy](#stack-deploy)
- [Other commands](#other-commands)
  - [Services](#services)
- [Scripts](#scripts)

## Docker files

|file|use|
|:--:|:-:|
|[docker-compose.yml](docker-compose.yml)|Run the full app in a single machine. For dev (run in your machine) and tests|
|[docker-compose-stack.yml](docker-compose-stack.yml)|Run the app in arqss swarm|

## Local deploy

Use `docker-compose` to deploy the full app in a single machine

```bash
docker-compose up -d -f docker-compose.local.test.yml # test
docker-compose up -d -f docker-compose.local.prod.yml # prod
```

## Stack deploy

To deploy the app stack on a single docker node using swarm

```bash
docker swarm init

docker stack deploy -c docker-compose.test.yml arqui # test
docker stack deploy -c docker-compose.prod.yml arqui # prod
```

To unmount the stack and the swarm

```bash
docker stack rm arqui
docker swarm leave --force
```

## Other commands

#### Services

```bash
docker container ls
```

#### Containers

```bash
docker container ls
```

## Scripts

|script|use|
|:---:||:-:|
|[zDockerMachine.sh](zDockerMachine.sh)|(**DON'T RUN**) Configure docker-machine with all arqss machines|
|[zInstallDocker.sh](zInstallDocker.sh)|Install docker, docker-compose and docker-machine on all arqss machines|
|[zRemoveNginx.sh](zRemoveNginx.sh)|Remove nginx from all arqss machines|
