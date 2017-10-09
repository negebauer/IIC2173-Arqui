for i in 2 7 11 12 13; do
  host="arqui$i"
  echo $host
  ssh $host -t """
    echo password for ${host}
    sudo echo

    sudo service nginx stop
    sudo apt-get purge -y nginx nginx-common
    sudo apt-get autoremove -y
  """
done
