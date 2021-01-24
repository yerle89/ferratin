# our base image
# docker build -t chat .
# docker run -p 3000:3000 -d --name chatContainer chat
FROM node

WORKDIR /usr/src/app

COPY package*.json ./
COPY public/ ./public
COPY index.js ./

RUN npm install

EXPOSE 3000

# run the application
CMD ["node", "index.js"]