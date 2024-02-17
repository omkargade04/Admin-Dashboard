require("dotenv").config();
const mysql = require("mysql2");
const fs = require('fs');

const caCert = fs.readFileSync('./config/ca.pem'); 


const pool = mysql.createPool ({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: false,
    ca: caCert,
  }
});

if(pool){
  console.log("Database connected");
}else{
  console.log("Error connecting db");
}

module.exports = pool;
