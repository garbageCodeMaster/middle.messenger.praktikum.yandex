FROM node:17.6.0

WORKDIR /src/app

COPY package.json .
COPY server.js .

RUN npm install

EXPOSE 3000

CMD npm run start
