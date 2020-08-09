jest.mock('../database', () => {
  return {
    query: jest.fn((sql, cb) => {
      console.log('Mock query was called with', sql);
      cb(null, [{ rating: 3.65 }]);
    })
  };
});

const db = require('../database');
const app = require('./server');
const supertest = require('supertest');

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return supertest(app)
      .get("/reviews/1234")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({"productId":"1234","rating":3.5});
        expect(db.query).toHaveBeenCalledWith(
          "SELECT AVG(rating) as rating FROM reviews WHERE product_id = 1234", 
          expect.any(Function));
      });
  });
});
