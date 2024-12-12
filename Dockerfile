FROM node:22-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN node --run build

EXPOSE 3000

CMD ["node", "--run", "start"]