# get the base node image
FROM node:18.15.0 as builder

# copy the json file first
COPY . /src

# set the working dir for container
WORKDIR /src

# install npm dependencies
# RUN npm install -g npm@9.6.6 

# RUN npm list

ARG AZURE_KEY_1
ARG OPEN_AI_KEY
ARG SERVICE_REGION
ARG CI_ENVIRONMENT
ARG ENVIRONMENT
# Variables de entorno
ENV AZURE_KEY_1=$AZURE_KEY_1
ENV OPEN_AI_KEY=$OPEN_AI_KEY
ENV SERVICE_REGION=$SERVICE_REGION
ENV CI_ENVIRONMENT=$CI_ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT

RUN npm install

RUN npm list

EXPOSE 3000
CMD [ "npm", "run", "dev"]
