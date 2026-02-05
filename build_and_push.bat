@echo off

REM ==== WEB ====
cd my-transfer
docker build -t stransfer-react --build-arg VITE_API_BASE_URL=http://18.194.206.9:5898 .
docker tag stransfer-react:latest novakvova/stransfer-react:latest
docker push novakvova/stransfer-react:latest

REM ==== API ====
cd ..\WebApiTransfer
docker build -t stransfer-api .
docker tag stransfer-api:latest novakvova/stransfer-api:latest
docker push novakvova/stransfer-api:latest

echo DONE
pause
