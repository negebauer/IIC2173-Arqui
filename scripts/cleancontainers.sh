bash stop.sh
echo '### REMOVING CONTAINERS ###'
for i in $(docker container ls -aq); do docker container rm $i; done
