const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: 'EtsyReviews',
  multipleStatements: true,
});

module.exports = connection;
