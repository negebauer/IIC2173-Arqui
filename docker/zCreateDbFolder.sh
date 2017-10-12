for i in 2 7 11 12 13; do
  host="arqui$i"
  ssh $host -t """
    mkdir -p /home/administrator/data/mongodb/db
  """
done
