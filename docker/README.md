# Docker Build

## Comandos

#### Stack deploy

```bash
# Iniciar swarm en nodo
docker swarm init

# Hacer deploy de un compose
docker stack deploy -c docker-compose-test.yml arqui

# Desmontar
docker stack rm arqui

# Salir del swarm
docker swarm leave --force
```

#### Swarm

```bash
# Iniciar swarm en nodo
docker-machine ssh HOST "docker swarm init --advertise-addr HOST_IP"
docker-machine ssh arqui2 "docker swarm init --advertise-addr arqss2.ing.puc.cl"
```

#### Generales

```bash
# Ver servicios
docker service ls
# Ver contenedores
docker container ls
```

## Scripts

- [installDocker.sh](installDocker.sh): Instala docker, docker-compose y docker-machine en las máquinas
- [removeNginx.sh](removeNginx.sh): Elimina nginx de las máquinas
