FROM node:17.6.0

WORKDIR /src/app

COPY package.json .
COPY ./dist ./dist
COPY server.js .

RUN npm install

EXPOSE 3000

CMD node ./server.js
