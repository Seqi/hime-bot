FROM node:8.14.0-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]