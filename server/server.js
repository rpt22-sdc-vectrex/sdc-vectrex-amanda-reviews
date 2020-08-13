const express = require('express');
const axios = require('axios');
const db = require('../database');

const app = express();

app.use(express.static('./public'));

// endpoint for reviews data to return rating for different modules
app.get('/reviews/:productId', (req, res) => {
  const id = req.params.productId;
  const sql = 'SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = ?';
  const queryArg = [id];
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
  const id = req.params.productId;
  const queryArg = [id];
  const sql = 'SELECT * FROM reviews WHERE product_id = ?';
  db.query(sql, queryArg, (err, reviewsForProductFromDB) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const allData = {};
      allData.reviewsArray = reviewsForProductFromDB;
      // counting average rating
      allData.avgRating = 0;
      for (let i = 0; i < allData.reviewsArray.length; i += 1) {
        allData.avgRating += allData.reviewsArray[i].rating;
      }
      allData.avgRating /= allData.reviewsArray.length;
      allData.avgRating = Math.round(allData.avgRating * 2) / 2;
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
          const { data } = reviewPhotosResponse;
          for (let j = 0; j < data.length; j += 1) {
            for (let k = 0; k < allData.reviewsArray.length; k += 1) {
              if (allData.reviewsArray[k].id === data[j].id) {
                allData.reviewsArray[k].userPicture = data[j].user_picture;
                allData.reviewsArray[k].reviewPicture = data[j].review_picture;
              }
            }
          }
          // adding product name
          allData.itemName = itemDetailsResponse.data.itemName;
          // adding main product image
          allData.mainImage = productPicturesResponse.data.item_pictures[0].thumbnail;
          res.send(allData);
        })
        .catch((error) => { res.status(500).send(error); });
    }
  });
});

// export for tests
module.exports = app;
