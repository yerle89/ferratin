FROM node

COPY package*.json ./
COPY *.js ./

RUN npm install

CMD node worker.js
