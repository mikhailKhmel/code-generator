FROM node:latest

WORKDIR /app/{%name%}

COPY package.json ./

RUN npm install
COPY . .

EXPOSE {%port%}
CMD [ "node", "index.js" ]