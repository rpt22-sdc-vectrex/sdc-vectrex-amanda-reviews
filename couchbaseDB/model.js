const uuid = require('uuid');
const N1qlQuery = require('couchbase').N1qlQuery;
const bucket = require('./index').bucket;

const ReviewsModel = ('Reviews', {
  id: 'integer',
  username: 'string',
  text: 'string',
  rating: 'number',
  review_id: 'integer'
});

//console.log('ReviewsModel type: ', typeof ReviewsModel);

ReviewsModel.getAll = ((data, callback) => {
  const statement = 'SELECT ' + 'META(review).id, review.username, review.text, review.rating, review.review_id  ' + 'FROM `' + bucket._name + '` AS review ' + 'WHERE review.type = "review"';
  const query = N1qlQuery.fromString(statement);
  bucket.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    callback(null, result);
  });
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
  //create or update
  const id = data.id ? data.id : uuid.v4();
  bucket.upsert(id, review, ((err, result) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    callback(null, result);
  }));
});

//console.log('ReviewsModel: ', ReviewsModel);

module.exports.ReviewsModel = ReviewsModel;