const supertest = require('supertest');
const db = require('../database');
const app = require('./server');

jest.mock('../database', () => ({
  query: jest.fn((sql, cb) => {
    // default case in my db, if product exist return rating
    cb(null, [{ product_id: 1234, rating: 3.65 }]);
  }),
}));

describe('It should return the correct response for a GET request to /reviews/:productId', () => {
  test('It should response the GET method with the corrected rating if product exist in db', () => supertest(app)
    .get('/reviews/1234')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ productId: '1234', rating: 3.5 });
      expect(db.query).toHaveBeenCalledWith(
        'SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = 1234',
        expect.any(Function),
      );
    }));

  test('It should response the GET method with a 404 if product is not in the db', () => {
    // For this test mock database returns an array of single row with null values
    db.query.mockImplementationOnce((sql, cb) => {
      cb(null, [{ product_id: null, rating: null }]);
    });

    return supertest(app)
      .get('/reviews/123')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.text).toEqual('no record in database for this product');
        expect(db.query).toHaveBeenLastCalledWith(
          'SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = 123',
          expect.any(Function),
        );
      });
  });
});
