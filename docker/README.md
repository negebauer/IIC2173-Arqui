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
|[docker-compose.yml](docker-compose.yml)|Run the full app in a single machine|
|[docker-compose.test.yml](docker-compose.test.yml)|Run the app in a swarm. Used for tests (virtual machines)|
|[docker-compose.prod.yml](docker-compose.prod.yml)|Run the app in a swarm. Used for production (arqss machines)|

## Local deploy

Use `docker-compose` to deploy the full app in a single machine

```bash
docker-compose up -d
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

- [zInstallDocker.sh](zInstallDocker.sh): Instala docker, docker-compose y docker-machine en las máquinas
- [zRemoveNginx.sh](zRemoveNginx.sh): Elimina nginx de las máquinas
