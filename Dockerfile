FROM node:latest

COPY . /app
WORKDIR  /app

RUN npm install

ENTRYPOINT node dist/server.js