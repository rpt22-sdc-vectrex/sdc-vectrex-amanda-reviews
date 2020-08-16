const express = require('express');
const axios = require('axios');
const db = require('../database');

const app = express();

app.use(express.static('./public'));

// endpoint for reviews data to return rating for different modules
app.get('/reviews/:productId', (req, res) => {
  const id = req.params.productId;
  const sql = 'SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = ?';
  const queryArg = id;
  db.query(sql, queryArg, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (!result[0].product_id) {
      res.status(404).send('no record in database for this product');
    } else {
      const rating = Math.round(result[0].rating * 2) / 2;
      res.send({ productId: id, rating });
    }
  });
});

// endpoint for reviews data to return rating for different modules
app.get('/reviews/all/:productId', (req, res) => {
  const sql = 'SELECT * FROM reviews WHERE product_id = ?';
  db.query(sql, req.params.productId, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // getting the review picture from S3, adding them to my own data from DB based on review id
      // links will be replaced with something like this: 'linktoimageservice/reviewPhotos',
      // 'linktoimageservice/pictures/:itemID, 'linktoproductservice/itemDetails/:productId
      Promise.all([
        axios.get('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/reviews.json'), // mnm: move these into constants at the top of file. const PHOTO_API_URL = ...
        axios.get('https://valeriia-ten-item-description.s3.us-east-2.amazonaws.com/itemDetails1.json'),
        axios.get('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/pictures-itemID.json'),
      ])
        .then(([
          reviewPhotosResponse,
          itemDetailsResponse,
          productPicturesResponse,
        ]) => {
          const photosById = {};
          reviewPhotosResponse.data.forEach((photos) => {
            // eslint-disable-next-line camelcase
            const { id, user_picture, review_picture } = photos;
            photosById[id] = { user_picture, review_picture };
          });

          const reviewsArray = reviews.map((review) => ({
            ...review,
            userPicture: photosById[review.id].user_picture,
            reviewPicture: photosById[review.id].review_picture,
          }));

          let avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
          avgRating = Math.round(avgRating * 2) / 2;

          const reviewsData = {
            reviewsArray,
            avgRating,
            itemName: itemDetailsResponse.data.itemName,
            mainImage: productPicturesResponse.data.item_pictures[0].thumbnail,
          };

          res.send(reviewsData);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  });
});

// export for tests
module.exports = app;
