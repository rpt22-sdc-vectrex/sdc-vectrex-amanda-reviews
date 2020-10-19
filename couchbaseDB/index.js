const couchbase = require('couchbase');
const ottoman = require('ottoman');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cluster = new couchbase.Cluster('couchbase://127.0.0.1', {
  username: process.env.CB_USERNAME,
  password: process.env.CB_PASSWORD
});

const bucket = cluster.bucket('etsy-reviews-service');

const collection = bucket.defaultCollection();

collection.upsert('testdoc', { name: 'Frank' }, (err, res) => {
  if (err) throw err;

  collection.get('testdoc', (err, res) => {
    if (err) throw err;

    console.log(res.value); // {name: Frank}
  });
});





module.exports.bucket = bucket;
module.exports.collection = collection;
