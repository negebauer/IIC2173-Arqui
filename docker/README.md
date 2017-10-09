# Arquiyalt Docker

## Table Of Contents

- [Stack deploy](#stack-deploy)
- [Other commands](#other-commands)
  - [Services](#services)
- [Scripts](#scripts)

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
