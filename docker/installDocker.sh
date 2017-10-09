for i in 2 7 11 12 13; do
  host="arqui$i"
  echo "#################### START $host START ####################"
  ssh $host -t """
    echo password for ${host}
    sudo echo

    # Install docker
    sudo apt-get update
    sudo apt-get purge -y docker docker-engine docker.io docker-compose docker-machine docker-ce
    sudo rm -rf /var/lib/docker
    sudo groupdel docker
    sudo apt-get install -y \
      linux-image-extra-4.4.0-93-generic \
      linux-image-extra-virtual \
      apt-transport-https \
      ca-certificates \
      curl \
      software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository 'deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable'
    sudo apt-get update
    sudo apt-get install -y docker-ce=17.09.0~ce-0~ubuntu
    sudo docker run hello-world

    # Configure docker user
    sudo groupadd docker
    sudo usermod -aG docker administrator

    # Set docker for startup
    sudo systemctl enable docker

    # Install docker-compose
    sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-Linux-x86_64 -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose --version

    # Install docker-machine
    curl -L https://github.com/docker/machine/releases/download/v0.12.2/docker-machine-Linux-x86_64 >/tmp/docker-machine &&
    chmod +x /tmp/docker-machine &&
    sudo cp /tmp/docker-machine /usr/local/bin/docker-machine
    docker-machine version
  """
  ssh $host -t """
    # Test docker user
    docker run hello-world
  """
  echo "#################### FINISHED $host FINISHED ####################"
done
