FROM node:10.15.0-alpine
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN NPM INSTALL

COPY . /home/app

RUN npm run start