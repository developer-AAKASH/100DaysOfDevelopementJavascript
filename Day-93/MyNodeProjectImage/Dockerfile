# step-1 -- getting a base image.
FROM node:alpine

# Cretae a working directory -- this can be anything from the linux folder structure but usually its either /var or /usr
WORKDIR /usr/NodeApp

# -- Bring all files -- first "./" is pointing the current location of docker file and secondone denots the default working directory
# COPY ./ ./ 
# below line for improving performance
COPY ./package.json ./

# run installer
RUN npm install
# below line for improving performance
COPY ./ ./

# step-3 -- set default commands
CMD [ "npm", "start" ]