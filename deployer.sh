#!/bin/bash
repository='https://github.com/xellunium/shibusaordinals-frontend.git'
app_dir=$(pwd)
output_dir=$app_dir/output
release_dir=$output_dir/releases
release=$(date +"%Y%m%d-%H%M%S")
new_release_dir=$release_dir/$release

echo 'Cloning repository'
[ -d "$release_dir" ] || mkdir -p "$release_dir"
git clone --depth 1 $repository "$new_release_dir" --recursive

echo 'Running npm build'
npm run build

echo 'Linking build folder'
rm -rf "$new_release_dir"/build
ln -nfs "$app_dir"/build "$new_release_dir"/build

echo 'Linking NodeModules'
rm -rf "$new_release_dir"/node_modules
ln -nfs "$app_dir"/node_modules "$new_release_dir"/node_modules

echo 'Linking Assets'
rm -rf "$new_release_dir"/assets
ln -nfs "$app_dir"/assets "$new_release_dir"/assets

# echo 'Linking ENV'
# rm -rf "$new_release_dir"/configs/env.json
# ln -sfn "$app_dir"/configs/env.json "$new_release_dir"/configs/env.json

echo 'Unlinking previous release'
unlink "$output_dir"/current

echo 'Linking current release'
ln -nfs "$new_release_dir" "$output_dir"/current
