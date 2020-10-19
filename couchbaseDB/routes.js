const ReviewsModel = require('./model').ReviewsModel;

const appRouter = () => {

  //get by id for CouchbaseDB
  app.get('/reviews-service/:id', (req, res) => {
    const id = req.params.id;
    ReviewsModel.getById(id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
        console.log('result: ', result);
      }
    });
  });

  app.post('/reviews-service', (req, res) => {
    ReviewsModel.save(req.body, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.send(result);
    });
  });
};

module.exports.appRouter = appRouter;