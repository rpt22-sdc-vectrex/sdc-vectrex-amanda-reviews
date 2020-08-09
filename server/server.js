const express = require('express');
const app = express();
const db = require('../database');

app.use(express.static('./public'));

// endpoint for reviews data to return rating for different modules
app.get('/reviews/:productId', function (req, res) {
  var id = req.params.productId;

  var sql = `SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (!result[0].product_id) {
        res.status(404).send('no record in database for this product');
      } else {
        rating = Math.round(result[0].rating * 2) / 2;
        res.send({ productId: id, rating: rating });
      }
    }
  })
});

// export for tests
module.exports = app;