FROM node:22-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000
