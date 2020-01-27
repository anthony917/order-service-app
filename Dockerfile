FROM node:13.7.0-alpine

WORKDIR /app

EXPOSE 8080

EXPOSE 8888

COPY ./app /app

RUN npm i

CMD [ "npm", "start" ]