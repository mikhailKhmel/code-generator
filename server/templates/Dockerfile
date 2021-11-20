FROM node:latest

WORKDIR /usr/src/{%name%}

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE {%port%}
CMD [ "node", "index.js" ]