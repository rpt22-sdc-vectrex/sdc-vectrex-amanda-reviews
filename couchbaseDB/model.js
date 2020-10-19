// const ottoman = require('ottoman');

// ottoman.bucket = require('./index').bucket;
const uuid = require('uuid');
const N1qlQuery = require('couchbase').N1qlQuery;
const bucket = require('./index').bucket;

const ReviewsModel = (() => {

});

ReviewsModel.getById = ((data, callback) => {
  bucket.get(data.id, ((err, result) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    callback(null, result.value);
  }));
});

ReviewsModel.save = ((data, callback) => {
  const review = {
    id: data.id,
    username: data.username,
    text: data.text,
    rating: data.rating,
    review_id: data.review_id
  };
  //create or replace
  const id = data.id ? data.id : uuid.v4();
  bucket.upsert(id, review, ((err, result) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    callback(null, result);
  }));
});

// const ReviewsModel = ottoman.model('Reviews', {
//   id: 'integer',
//   username: 'string',
//   text: 'string',
//   rating: 'number',
//   review_id: 'integer'
// });

module.exports.ReviewsModel = ReviewsModel;