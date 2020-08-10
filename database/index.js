const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'FEC1',
  multipleStatements: true
});

module.exports = connection;