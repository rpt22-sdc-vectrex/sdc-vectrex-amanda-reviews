const express = require('express');
const axios = require('axios');
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

app.get('/review-list/:productId', (req, res) => {
  const pageNumber = req.query.pageNumber || 1;

  // sorting by date or rating
  let sql = '';
  if (req.query.sortBy === 'date') {
    sql = 'SELECT * FROM reviews WHERE product_id = ? ORDER BY date DESC LIMIT ?, 4;';
  } else {
    sql = 'SELECT * FROM reviews WHERE product_id = ? ORDER BY rating DESC LIMIT ?, 4;';
  }

  const queryArgs = [req.params.productId, pageNumber * 4 - 4];
  db.query(sql, queryArgs, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(reviews);
      // TODO: change links after deployment: linktoimageservice/reviewPhotos',
      // 'linktoimageservice/pictures/:itemID, 'linktoproductservice/itemDetails/:productId
      Promise.all([
        axios.get('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/reviews.json'),
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
            itemName: itemDetailsResponse.data.itemName,
            mainImage: productPicturesResponse.data.item_pictures[0].thumbnail,
          }));

          res.send(reviewsArray);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  });
});

app.get('/reviews-by-store/:productId', (req, res) => {
  const pageNumber = req.query.pageNumber || 1;

  // sorting by date or rating
  let sql = '';
  if (req.query.sortBy === 'date') {
    sql = 'SELECT * FROM reviews LEFT JOIN product_to_stores ON reviews.product_id = product_to_stores.id WHERE store_id = (SELECT store_id FROM product_to_stores WHERE id = ?) ORDER BY date DESC LIMIT ?, 4;';
  } else {
    sql = 'SELECT * FROM reviews LEFT JOIN product_to_stores ON reviews.product_id = product_to_stores.id WHERE store_id = (SELECT store_id FROM product_to_stores WHERE id = ?) ORDER BY rating DESC LIMIT ?, 4;';
  }

  const queryArgs = [req.params.productId, pageNumber * 4 - 4];
  db.query(sql, queryArgs, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // TODO: change links after deployment: linktoimageservice/reviewPhotos',
      // 'linktoimageservice/pictures/:itemID, 'linktoproductservice/itemDetails/:productId
      Promise.all([
        axios.get('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/reviews.json'),
        axios.get('https://valeriia-ten-item-description.s3.us-east-2.amazonaws.com/100details.json'),
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

          const itemNameById = {};
          itemDetailsResponse.data.forEach((products) => {
            // eslint-disable-next-line camelcase
            const { productId, itemName } = products;
            itemNameById[productId] = { itemName };
          });

          const reviewsArray = reviews.map((review) => ({
            ...review,
            userPicture: photosById[review.id].user_picture,
            reviewPicture: photosById[review.id].review_picture,
            itemName: itemNameById[review.id].itemName,
            // TODO: check with Zack for batch S3
            mainImage: productPicturesResponse.data.item_pictures[0].thumbnail,
          }));

          res.send(reviewsArray);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  });
});

app.get('/reviews-pictures/:productId', (req, res) => {
  const sql = 'SELECT reviews.id FROM reviews LEFT JOIN product_to_stores ON reviews.product_id = product_to_stores.id WHERE store_id = (SELECT store_id FROM product_to_stores WHERE id = ?)';

  db.query(sql, req.params.productId, (err, reviewIds) => {
    if (err) {
      res.status(500).send(err);
    } else {
      axios.get('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/reviews.json')
        .then((reviewPhotosResponse) => {
          const photosById = {};
          reviewPhotosResponse.data.forEach((photos) => {
            // eslint-disable-next-line camelcase
            const { id, review_picture } = photos;
            photosById[id] = { review_picture };
          });
          const reviewsArray = [];
          reviewIds.forEach((reviewId) => {
            if (photosById[reviewId.id].review_picture) {
              reviewsArray.push(photosById[reviewId.id].review_picture);
            }
          });

          res.send(reviewsArray);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  });
});

// export for tests
module.exports = app;
