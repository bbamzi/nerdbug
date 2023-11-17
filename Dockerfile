FROM node:18.10.0-alpine
WORKDIR /src
EXPOSE 3000
CMD ["npx","sequelize-cli","db:create"]
CMD [ "npm", "run" , "dev" ]
COPY package.json /src
RUN npm install
COPY . /src