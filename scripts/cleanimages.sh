bash cleancontainers.sh
echo '### REMOVING IMAGES ###'
for i in $(docker images -q); do docker image rm $i; done
