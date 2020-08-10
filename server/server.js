const express = require('express');
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

// export for tests
module.exports = app;
