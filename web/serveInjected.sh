# If backup means that env variables where
# already injected in bundle. So we have
# to restore bundle to inject new ones
backup=$(ls dist | grep main.*.js.backup)
if [[ $backup ]]; then
  cp -f dist/$backup dist/main.*.js
fi

# Replicate following for each DOCKER_ENV_
# to inject on container run
sed -i.backup "s~DOCKER_ENV_API~$API~g" dist/main.*.js

# Serve the static server
serve -s dist
