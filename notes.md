# Ryan's Project Guide 
- a guide, by Ryan

In the words of Ryan:
> Write comments for your future self
> Plan Your Ish

## Step 0: Check yo'Self b4 you wreck yo'self
  
  - plan out the structure of tables 
  - make sure all tables are related to eachother in a way that is not dumb.

## Step 1: Install dependencies
Initialize and add a package.json

  - `npm init -y`

Install Dependencies

  - `npm i express sqlite knex dotenv`

Install nodemon as dev dependency

  - run `npm i -D nodemon`

## Step 2: Get Config'ed

Create knexfile.js

  - `knex init`

Configure knexfile.js

  - set filename to ./whatever.db3
  - add migrations and seeds directory

Add scripts to package.json

  - "server": "nodemon index.js",
  - "start": "node index.js"

Built out index.js and server.js

Built out dbConfig.js file

## Step 3: Create Migration

- run `knex migrate:make <migrationName>`
- built out migration file with proper table structure according to **PLANNED** database structure.
- run `knex migrate:latest` to create actual database table
- if you have many to many relationships you need an intermediary table. This holds FK's that reference the PK on the related tables

## Step 4: Build out Router and Model

- built out projects-Router
- built out model