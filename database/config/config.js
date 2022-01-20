require('dotenv').config({path:"../../config/config.env"});

//console.log(process.env.DATABESE_PASSWORD)

const databaseName = process.env.DATABASE_NAME
const dbPassword = process.env.DB_PASSWORD
const dialect = process.env.DIALECT

console.log(`information#muprla::${databaseName}`)
module.exports={
  "development": {
    "username": "postgres",
    "password": "pass104",
    "database": "postgres",
    "port": "5432",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PRODUCTION_PASSWORD,
    "database": process.env.PRODUCTION_DATABASE,
    "host": process.env.HOST,
    "port":process.env.PRODUCTION_PORT,
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        require:true,
        rejectUnauthorized: false
       },
      
    }
  }
}
