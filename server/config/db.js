require("dotenv").config();
const mysql = require("mysql");

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.log(err)
  }
  console.log("Database connection successful");
});

module.exports = connection;
