FROM node:alpine

WORKDIR /var/app

#     from current machine to container
COPY ./package.json ./

RUN npm install

# copy all the files and folders from current directory to container's current directory
COPY . .

CMD [ "npm" "start" ]