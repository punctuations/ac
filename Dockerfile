FROM node:10-alpine

ENV PORT 3000

# Create app directory
RUN apk update && \
    apk add nodejs npm git nano docker-compose && \
    git clone https://github.com/punctuations/ac /ac
WORKDIR /ac

# Install app dependencies
COPY package*.json /ac/
RUN npm install

# Bundle app source
COPY . /ac

EXPOSE 3000