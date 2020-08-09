const express = require('express');
const app = express();
const db = require('../database');
const port = 8888;

app.use(express.static('./public'));

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// });

// endpoint for reviews data to return rating for different modules
app.get('/reviews/:productId', function (req, res) {
  var id = req.params.productId;

  var sql = `SELECT AVG(rating) as rating FROM reviews WHERE product_id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      rating = Math.round(result[0].rating * 2) / 2;
      res.send({ productId: id, rating: rating });
    }
  })
});

// export for tests
module.exports = app;