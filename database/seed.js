const connection = require('./index.js');

var queryString = `
DROP DATABASE IF EXISTS FEC1;CREATE DATABASE FEC1;
USE FEC1;
DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,username VARCHAR(50) NOT NULL,\`text\` TEXT NOT NULL,rating INTEGER NOT NULL,\`date\` DATE NOT NULL,product_id INTEGER NOT NULL,user_profile_url VARCHAR(250) NOT NULL,store_id INTEGER NOT NULL);
`;

connection.query(queryString, function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
  connection.end();
});