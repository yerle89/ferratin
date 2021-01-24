# our base image
# docker build -t carritorest .
# docker run -p 3000:3000 -d --name carritoRestContainer carritorest
FROM node

WORKDIR /usr/src/app

COPY package*.json ./
COPY src/ ./

RUN npm install

EXPOSE 3000

# run the application
CMD ["node", "index.js"]