#!/bin/bash
set -e  # зупиняє скрипт при помилці

cd my-transfer
docker build -t transfer-react --build-arg VITE_API_BASE_URL=http://54.93.238.183:5898 .
docker tag transfer-react:latest siuzanna/transfer-react:latest
docker push siuzanna/transfer-react:latest
echo "Done ---client---!"

cd ../WebApiTransfer
docker build -t transfer-api .
docker tag transfer-api:latest siuzanna/transfer-api:latest
docker push siuzanna/transfer-api:latest

echo "Done ---api---!"

read -p "Press any key to exit..."
 