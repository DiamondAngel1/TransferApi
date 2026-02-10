set -e

cd my-transfer
docker build -t transferp-react --build-arg VITE_API_BASE_URL=http://54.93.238.183:5898 .
docker tag transferp-react:latest siuzanna/transferp-react:latest
docker push siuzanna/transferp-react:latest
echo "Done --client--"


cd ../WebApiTransfer
docker build -t transferp-api .
docker tag transferp-api:latest siuzanna/transferp-api:latest
docker push siuzanna/transferp-api:latest

echo "Done --api--"
read -p "Press any key"