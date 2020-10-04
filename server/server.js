/* eslint-disable no-shadow */
/* eslint-disable camelcase */
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
  // const { productId } = req.params;
  // const sql = 'SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = ?';
  // db.query(sql, productId, (err, result) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else if (!result[0].product_id) {
  //     res.status(404).send('no record in database for this product');
  //   } else {
  //     const rating = Math.round(result[0].rating * 2) / 2;
  //     res.send({ productId, rating });
  //   }
  // });
  const sql = 'SELECT product_id, AVG(rating) as rating FROM reviews group by product_id';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const allProductRatings = [];
      result.forEach((product) => {
        const { product_id } = product;
        const rating = Math.round(product.rating * 2) / 2;
        allProductRatings[product_id - 1] = { product_id, rating };
      });
      res.send(allProductRatings);
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
      res.set('Cache-Control', 'max-age=3600');
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
      const reviewIds = reviews.map((review) => review.id);
      // Use a set to eliminate duplicate product IDs
      const productIds = Array.from(new Set(reviews.map((review) => review.product_id)));
      const reviewPhotosRequest = {
        params: {
          ids: reviewIds,
        },
      };
      Promise.all([
        axios.get('http://localhost:3000/reviewPhotos/batch', reviewPhotosRequest),
        Promise.all(productIds.map((pId) => axios.get(`http://localhost:5000/itemDetails/${pId}`).then((res) => res.data[0]))),
        Promise.all(productIds.map((pId) => axios.get(`http://localhost:3000/pictures?itemId=${pId}`).then((res) => res.data))),
      ])
        .then(([
          reviewPhotosResponse,
          itemDetailsResponses,
          productPhotosResponses,
        ]) => {
          const userAndReviewPhotosById = {};
          reviewPhotosResponse.data.forEach((photos) => {
            const { id, user_picture, review_picture } = photos;
            userAndReviewPhotosById[id] = { user_picture, review_picture };
          });
          const productNameById = {};
          itemDetailsResponses.forEach((product) => {
            productNameById[product.productId] = product.itemName;
          });
          const productPhotoById = {};
          productPhotosResponses.forEach((product) => {
            productPhotoById[product.item_id] = product.item_pictures[0].thumbnail;
          });
          const reviewsArray = reviews.map((review) => ({
            ...review,
            userPicture: userAndReviewPhotosById[review.id].user_picture,
            reviewPicture: userAndReviewPhotosById[review.id].review_picture,
            itemName: productNameById[review.product_id],
            mainImage: productPhotoById[review.product_id],
          }));
          res.set('Cache-Control', 'max-age=3600');
          res.send(reviewsArray);
        })
        .catch((error) => {
          console.error(error);
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
      const ids = reviewIds.map((review) => review.id);
      const reviewPhotosRequest = {
        params: {
          ids,
        },
      };
      axios.get('http://localhost:3000/reviewPhotos/batch', reviewPhotosRequest)
        .then((reviewPhotosResponse) => {
          console.log(reviewPhotosResponse);
          const photosById = {};
          reviewPhotosResponse.data.forEach((photos) => {
            // eslint-disable-next-line camelcase
            const { id, review_picture } = photos;
            photosById[id] = { review_picture };
          });
          const reviewsArray = [];
          ids.forEach((reviewId) => {
            if (photosById[reviewId].review_picture) {
              reviewsArray.push([reviewId, photosById[reviewId].review_picture]);
            }
          });
          res.set('Cache-Control', 'max-age=3600');
          res.send(reviewsArray);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  });
});

//CRUD implementation
//all reviews routes

//app.get(/reviews-service) //responding correctly
app.get('/reviews-service', (req, res) => {
  const sql = 'SELECT * FROM reviews_service';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('reviews-service result: ', result)
      res.send(result);
    }
  });
});

//app.post(/reviews-service) //responding correctly
app.post('/reviews-service', (req, res) => {
  const review = req.body;
  const sql = `INSERT INTO reviews_service SET ?`;
  db.query(sql, review, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('reviews-service posted successfully');
    }
  });
});

//all id routes

//app.get(/reviews-service/:review-id) //responding correctly
app.get('/reviews-service/:review-id', (req, res) => {
  const sql = 'SELECT review_id, AVG(rating) as rating FROM reviews_service group by review_id';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const allRatings = [];
      result.forEach((review) => {
        const { review_id } = review;
        const rating = Math.round(review.rating * 2) / 2;
        allRatings[review_id - 1] = { review_id, rating };
      });
      res.send(allRatings);
    }
  });
});

//app.put(/reviews-service/:review-id)
app.put('/reviews-service', (req, res) => {
  const review = req.body;
  //not working: UPDATE reviews_service SET rating = 4 WHERE review_id = 103
  //not working: UPDATE reviews_service SET rating = ? WHERE review_id = ?
  //working, but need to make review_id dynamic: UPDATE reviews_service SET rating = ? WHERE review_id = 58 (w/reviews-service)
  const sql = 'UPDATE reviews_service SET rating = ? WHERE review_id = 58';
  db.query(sql, review, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('successfully updated review by id');
    }
  });
});

//app.delete(/reviews-service/:review-id)
app.delete('/reviews-service', (req, res) => {
  //works (w/reviews-service), but need to make review_id dynamic: DELETE FROM reviews_service WHERE review_id = 8
  const reviewId = req.params.review_id;
  const sql = 'DELETE FROM reviews_service WHERE review_id = 8';
  db.query(sql, [reviewId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('successfully deleted review by id: ');
    }
  });
});

// third: fall through to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// export for tests
module.exports = app;
