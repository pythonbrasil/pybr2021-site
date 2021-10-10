FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Installing dependencies
COPY package.json /usr/src/
RUN npm install