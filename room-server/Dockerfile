FROM node:16

EXPOSE 8080

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app

RUN npm install

CMD ["npm", "start"]
