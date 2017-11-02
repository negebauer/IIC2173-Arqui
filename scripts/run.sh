cd docker
echo '### BUILDING IMAGES ###'
docker-compose build
echo '### MOUNTING CONTAINERS ###'
docker-compose up -d
echo '### CONTAINERS ###'
docker ps
