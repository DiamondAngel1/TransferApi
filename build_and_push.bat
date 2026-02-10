@echo off

REM ==== WEB ====
cd my-transfer
docker build -t transfer-react --build-arg VITE_API_BASE_URL=http://54.93.238.183:5898 .
docker tag transfer-react:latest siuzanna/transfer-react:latest
docker push siuzanna/transfer-react:latest

REM ==== API ====
cd ..\WebApiTransfer
docker build -t stransfer-api .
docker tag transfer-api:latest siuzanna/transfer-api:latest
docker push siuzanna/transfer-api:latest

echo DONE
pause
