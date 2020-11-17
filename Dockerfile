FROM alpine:latest

RUN apk update && \
    apk add nodejs npm git nano && \
    git clone https://github.com/punctuations/ac /ac && \
    cd /ac && \
    npm i 