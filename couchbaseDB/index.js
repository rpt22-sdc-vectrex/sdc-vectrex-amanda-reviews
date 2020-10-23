const couchbase = require('couchbase');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cluster = new couchbase.Cluster('couchbase://127.0.0.1', {
  username: process.env.CB_USERNAME,
  password: process.env.CB_PASSWORD
});

const bucket = cluster.bucket('etsy-reviews-service');

const collection = bucket.defaultCollection();


const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});



module.exports.collection = collection;
module.exports.app = app;
