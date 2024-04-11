FROM node:21-bullseye-slim


# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package*.json /app

RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD [ "npm" , "start"]