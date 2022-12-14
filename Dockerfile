FROM node:17.6.0

WORKDIR /app

COPY package.json .
COPY server.js .
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
