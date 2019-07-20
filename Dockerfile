FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY package.*json ./

RUN NPM INSTALL

COPY . .

EXPOSE 4000

CMD ["npm", "start"]