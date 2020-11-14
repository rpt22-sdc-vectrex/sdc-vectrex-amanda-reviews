const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: 'EtsyReviews',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  multipleStatements: true,
});

module.exports = connection;
