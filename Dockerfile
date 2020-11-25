FROM node:10-alpine

ENV PORT 3000

# Create app directory
RUN apk update && \
    apk add nodejs npm git nano && \
    git clone https://github.com/punctuations/ac /ac
WORKDIR /ac

# Install app dependencies
RUN npm install

# Bundle app source
COPY . /ac

EXPOSE 3000

# CMD [ "npm", "run", "dev" ]