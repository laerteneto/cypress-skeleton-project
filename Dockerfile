# Pull image
FROM node16.14.2-slim-chrome100-ff99-edge

# Creating a directory inside container
RUN mkdir /testApp
WORKDIR /testApp

# Copying Cypress tests code from your repo/host to container
COPY . /testApp

# Running the tests
# RUN yarn && yarn cy:run
# You can use "docker build -t cypress ." to run as well