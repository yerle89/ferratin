FROM node

COPY package*.json ./
COPY *.js ./

RUN npm install

EXPOSE 8000 8001
CMD node broker.js
