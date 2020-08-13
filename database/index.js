const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'EtsyReviews',
  multipleStatements: true,
});

module.exports = connection;
