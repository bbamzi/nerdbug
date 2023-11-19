# To use the App run

## TO install the packages

    -- npm install

## To initialize the database

    make sure mysql is installed on your system
        see https://dev.mysql.com/doc/mysql-getting-started/en/ for installation procedure



    create a database name nerdbug , this can be don by right clicking on the schema tab and adding a new schema


    edit the  .env file in the root folder and input the following :
        DB_USER="root" // if your username is not root make sure you change this to your username
        DB_NAME="nerdbug"
        DB_PASS="your password from setting up"
        SECRET_KEY="random key"


A migration file has been created to propagate the database fields

## npm run dev to run app

# npm test to run test cases

this will create a table in your database

visit https://documenter.getpostman.com/view/23775911/2s9YXpUdLr for documentation
