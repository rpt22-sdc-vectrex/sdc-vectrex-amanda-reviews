const express = require('express');
// const axios = require('axios');
const db = require('../database');

const app = express();

app.use(express.static('./public'));

// endpoint for reviews data to return rating for different modules
app.get('/reviews/:productId', (req, res) => {
  const { productId } = req.params;
  const sql = 'SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = ?';
  db.query(sql, productId, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (!result[0].product_id) {
      res.status(404).send('no record in database for this product');
    } else {
      const rating = Math.round(result[0].rating * 2) / 2;
      res.send({ productId, rating });
    }
  });
});

// initial store data (need it only once, doesn't change when tabs or pager will be clicked)
app.get('/review-summary/:productId', (req, res) => {
  const sql = 'SELECT COUNT(*) as count, AVG(rating) as avgRating FROM reviews LEFT JOIN product_to_stores ON reviews.product_id = product_to_stores.id WHERE store_id = (SELECT store_id FROM product_to_stores WHERE id = ?); SELECT COUNT(*) as count FROM reviews WHERE product_id = ?;';
  const queryArgs = [req.params.productId, req.params.productId];
  db.query(sql, queryArgs, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const reviewSummary = {};
      reviewSummary.storeCount = result[0][0].count;
      reviewSummary.rating = Math.round(result[0][0].avgRating * 2) / 2;
      reviewSummary.productCount = result[1][0].count;
      res.send(reviewSummary);
    }
  });
});

// endpoint for getting initial prod reviews

// endpoint for reviews data to return rating for different modules
// app.get('/reviews/all/:productId', (req, res) => {
//   const sql = 'SELECT * FROM reviews WHERE product_id = ?';
//   db.query(sql, req.params.productId, (err, reviews) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       // getting the review picture from S3, adding them to my own data 
// from DB based on review id
//       // links will be replaced with something like this: 'linktoimageservice/reviewPhotos',
//       // 'linktoimageservice/pictures/:itemID, 'linktoproductservice/itemDetails/:productId
//       Promise.all([
//         axios.get('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/reviews.json'),
//         axios.get('https://valeriia-ten-item-description.s3.us-east-2.amazonaws.com/itemDetails1.json'),
//         axios.get('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/pictures-itemID.json'),
//       ])
//         .then(([
//           reviewPhotosResponse,
//           itemDetailsResponse,
//           productPicturesResponse,
//         ]) => {
//           const photosById = {};
//           reviewPhotosResponse.data.forEach((photos) => {
//             // eslint-disable-next-line camelcase
//             const { id, user_picture, review_picture } = photos;
//             photosById[id] = { user_picture, review_picture };
//           });

//           const reviewsArray = reviews.map((review) => ({
//             ...review,
//             userPicture: photosById[review.id].user_picture,
//             reviewPicture: photosById[review.id].review_picture,
//           }));

//           let avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
//           avgRating = Math.round(avgRating * 2) / 2;

//           const reviewsData = {
//             reviewsArray,
//             avgRating,
//             itemName: itemDetailsResponse.data.itemName,
//             mainImage: productPicturesResponse.data.item_pictures[0].thumbnail,
//           };

//           res.send(reviewsData);
//         })
//         .catch((error) => {
//           res.status(500).send(error);
//         });
//     }
//   });
// });

// export for tests
module.exports = app;
