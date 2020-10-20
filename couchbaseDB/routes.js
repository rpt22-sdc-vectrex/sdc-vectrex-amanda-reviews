const ReviewsModel = require('./model').ReviewsModel;
const collection = require('./index').collection;
const app = require('./index').app;

console.log('collection type: ', typeof collection);

const appRouter = (app) => {

  app.get('/reviews-service', (req, res) => {
    ReviewsModel.getAll((err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(result);
    });
  });

  //get by id
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
        return res.status(500).send(err);
      }
      res.send(result);
    });
  });
};

// collection.upsert('testdoc', { name: 'Frank' }, (err, res) => {
//   if (err) throw err;

//   collection.get('testdoc', (err, res) => {
//     if (err) throw err;

//     console.log(res.value); // {name: Frank}
//   });
// });

module.exports.appRouter = appRouter;