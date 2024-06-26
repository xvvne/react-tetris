FROM node:16.20.2-buster
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm","start"]