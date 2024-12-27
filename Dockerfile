FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]