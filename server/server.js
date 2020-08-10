const express = require('express');
const axios = require('axios');
const db = require('../database');

const app = express();

app.use(express.static('./public'));

// endpoint for reviews data to return rating for different modules
app.get('/reviews/:productId', (req, res) => {
  const id = req.params.productId;

  const sql = `SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
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
  const sql = `SELECT * FROM reviews WHERE product_id = ${id}`;
  db.query(sql, (err, reviewsForProductFromDB) => {
    if (err) {
      throw err;
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
        axios.get('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/reviewPhotos.json'),
        axios.get('https://valeriia-ten-item-description.s3.us-east-2.amazonaws.com/itemDetails2.json'),
        axios.get('https://rvrita-fec-reviews.s3.us-west-1.amazonaws.com/pic.json'),
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
                allData.reviewsArray[k].review_picture = data[j].review_picture;
              }
            }
          }
          // adding product name
          allData.itemName = itemDetailsResponse.data.itemName;
          // adding main product image
          allData.mainImage = productPicturesResponse.data.pictures[0];
          res.send(allData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

// export for tests
module.exports = app;
