for i in 2 7 11 12 13; do
  echo y | docker-machine rm arqss$i
  docker-machine create                   \
  --driver generic                        \
  --generic-ip-address arqss$i.ing.puc.cl \
  --generic-ssh-key ~/.ssh/arqss$i        \
  --generic-ssh-user administrator arqss$i
done
