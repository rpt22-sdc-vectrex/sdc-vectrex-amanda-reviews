const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database');

const app = express();

app.use(cors());

// first: static files
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// second: all api endpoints
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
      reviewSummary.storeReviewCount = result[0][0].count;
      reviewSummary.rating = Math.round(result[0][0].avgRating * 2) / 2;
      reviewSummary.productReviewCount = result[1][0].count;
      res.send(reviewSummary);
    }
  });
});

// get store reviews
app.get('/review-list/:productId', (req, res) => {
  const pageIndex = (req.query.pageNumber || 1) - 1;
  const limit = 4;
  const { productId } = req.params;
  const sortBy = req.query.sortBy === 'date' ? 'date' : 'rating';
  const entireStore = req.query.store === 'true';
  const sql = entireStore ? `
    SELECT * FROM reviews 
    LEFT JOIN product_to_stores ON reviews.product_id = product_to_stores.id 
    WHERE store_id = (
      SELECT store_id FROM product_to_stores WHERE id = ?
      ) 
    ORDER BY ?? DESC 
    LIMIT ?, ?;
    `
    : 'SELECT * FROM reviews WHERE product_id = ? ORDER BY ?? DESC LIMIT ?, ?;';
  const queryArgs = [productId, sortBy, pageIndex * limit, limit];
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
          itemDetailsResponse.data.forEach((product) => {
            const { itemName } = product;
            itemNameById[product.productId] = { itemName };
          });
          const reviewsArray = reviews.map((review) => ({
            ...review,
            userPicture: photosById[review.id].user_picture,
            reviewPicture: photosById[review.id].review_picture,
            itemName: itemNameById[review.product_id].itemName,
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

// get all review pictures
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
              reviewsArray.push([reviewId.id, photosById[reviewId.id].review_picture]);
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

// third: fall through to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// export for tests
module.exports = app;
