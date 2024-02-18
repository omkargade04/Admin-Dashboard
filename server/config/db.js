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
    ca: `-----BEGIN CERTIFICATE-----
    MIIEQTCCAqmgAwIBAgIUT3ClsQLy1vvXe1ZaoWfr4bLzSOYwDQYJKoZIhvcNAQEM
    BQAwOjE4MDYGA1UEAwwvYjhmMzA1MWQtMjI3Ni00ZjIxLThlMmQtY2ZmNmQ3OTY1
    YjcyIFByb2plY3QgQ0EwHhcNMjQwMjE3MTQyNjI5WhcNMzQwMjE0MTQyNjI5WjA6
    MTgwNgYDVQQDDC9iOGYzMDUxZC0yMjc2LTRmMjEtOGUyZC1jZmY2ZDc5NjViNzIg
    UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAM0lpdLp
    dzAVxHVUmRgHZmYOxJ+n51FHKn/sb0l+a26MZZP358cGcny6Fm4hVabaNNcydCAB
    iWCA9ShEcG5o2ZVIRMyfrFL3EnojSOcaZZFCSobNo9D5amT1OB7cyoDnwKkoBC7B
    27YUB3KW7D9DMELJDHr+I6XGZbsmdY78pE5VBfy9BvwqwAdymhh4gYiXhwA+SmJb
    w67n8JGhf8q1PUZS0hnt9pSlGMuqSkA6CST/FXqNGwAhSfvUTbx0/UGeI3LN9m5d
    sWZdgA87l0dfV8zvDa6rDkxwNhDXANeJ+xyhXtA1qI5ZDGhXauRrylaFctggDWRH
    ilH29QkHV3KjacjHL9qdLhBBwKe8R6lShpA0FTeX1RpcGwXoNUEpzRkwenElNwEN
    ODbF5r4KP0wbaKeWEGm4kdhuXHsazNTnGr2+Vgc3pd89SW0QVXzmWrbvhuj0XuxI
    q5yWDAXMHkKRbx8cav7VSQLvmn13TfgDHJ8ulcaSjKXLwgH0eIs17vvAxwIDAQAB
    oz8wPTAdBgNVHQ4EFgQUmm0kZQ9IyODbpqMlqMMUQWoCuQkwDwYDVR0TBAgwBgEB
    /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAD26dXrFLhnJa47N
    D4jVK5q4aikXABNtbSHr/iOWPzyISzETz7oYHDF5GiNyW8EDqj7srO3FwWKPVYJn
    jxhwU1IsDH7OemoCtN9Gr371KM/zyh7qfn7/goh2DkrJThuUUjHQLmoT2Ixp9i9P
    4sORiMf3MXObtwB0xsMaOdxc2PFwdzEfEARbpC8Ds5Y+4nwtiWOydCr+5BCBEF6L
    rtK7eRpcfdDm44p6M7CGxIDTsY/hbDSKkeJ5e+trbe7xJ+b9J3r4rMBvfHAZpJ4I
    BORlIEdtWFuoWCvLqG8Nqc0Tjgv/rwT3QBorajxN4oWu4gM8KjiKajJ1o51rJHJL
    f9T0E3PVUmIrc9J642BbLeSKJXtUH+K0FnUG1Ts9HEJb4Vx7I6yH2NycFVYd+OO3
    amTg75UCuUlzleENRUTWJv4biQLJwF69vlvO4Y/T5LEetOz9e+O7Cp/VBkbt2Z2A
    tmsBMsKoO+HTqejkj/jbML4y7GslTaM0Ad6PsEEbs9+N/f9r9w==
    -----END CERTIFICATE-----
    `,
    rejectUnauthorized: false,
  }
});

if(pool){
  console.log("Database connected");
}else{
  console.log("Error connecting db");
}

module.exports = pool;
