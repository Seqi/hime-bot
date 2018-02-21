FROM node:8.1.4-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]