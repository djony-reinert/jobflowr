# Base image
FROM node:18.13.0-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --silent
RUN yarn add eslint-loader --dev
RUN yarn add craco --dev

COPY . .

CMD ["yarn", "start"]

