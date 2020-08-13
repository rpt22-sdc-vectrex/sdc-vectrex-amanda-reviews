const supertest = require('supertest');
const moxios = require('moxios');
const db = require('../database');
const app = require('./server');

jest.mock('../database', () => ({
  query: jest.fn((sql, args, cb) => {
    // default case in my db, if product exist return rating
    cb(null, [{ product_id: 1234, rating: 3.65 }]);
  }),
}));

const REVIEW_1 = {
  id: 90,
  username: 'bteaz2h',
  text: 'Phasellus in felis. Donec semper sapien a libero.',
  rating: 4,
  date: '2020 - 02 - 19T08: 00: 00.000Z',
  product_id: 3,
  user_profile_url: 'http://google.ca',
  store_id: 5,
};

const REVIEW_2 = {
  id: 94,
  username: 'japted2l',
  text: 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
  rating: 3,
  date: '2017 - 11 - 18T08: 00: 00.000Z',
  product_id: 3,
  user_profile_url: 'http://shinystat.com',
  store_id: 5,
};

describe('It should return the correct response for a GET request to /reviews/:productId', () => {
  test('It should response the GET method with the corrected rating if product exist in db', () => supertest(app)
    .get('/reviews/1234')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ productId: '1234', rating: 3.5 });
      expect(db.query).toHaveBeenCalledWith(
        'SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = ?',
        ['1234'],
        expect.any(Function),
      );
    }));

  test('It should response the GET method with a 404 if product is not in the db', () => {
    // For this test mock database returns an array of single row with null values
    db.query.mockImplementationOnce((sql, args, cb) => {
      cb(null, [{ product_id: null, rating: null }]);
    });

    return supertest(app)
      .get('/reviews/123')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.text).toEqual('no record in database for this product');
        expect(db.query).toHaveBeenLastCalledWith(
          'SELECT product_id, AVG(rating) as rating FROM reviews WHERE product_id = ?',
          ['123'],
          expect.any(Function),
        );
      });
  });
});

describe('It should return the correct response for a GET request to /reviews/all/:productId', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('It should response the GET method', () => {
    // For this test mock database returns an array of objects
    db.query.mockImplementationOnce((sql, args, cb) => {
      cb(null,
        [REVIEW_1, REVIEW_2]);
    });

    moxios.stubRequest('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/reviews.json', {
      status: 200,
      response: [
        {
          id: 90,
          user_picture: 'user90.jpg',
          review_picture: 'review90.jpg',
        },
        {
          id: 94,
          user_picture: 'user94.jpg',
          review_picture: 'review94.jpg',
        },
      ],
    });
    moxios.stubRequest('https://valeriia-ten-item-description.s3.us-east-2.amazonaws.com/itemDetails1.json', {
      status: 200,
      response: [
        {
          productId: 3,
          itemName: 'Beautiful In Every Way- Song of Solomon 4:7 Scripture Glass Mug 16 oz',
          materials: 'Glass',
          itemDescription: 'If you’re anything like me, I LOVE drinking tea whilst with my life,  I LOVE drinking tea whilst with my life',
        },
      ],
    });
    moxios.stubRequest('https://zack-romsdahl-pictures.s3-us-west-1.amazonaws.com/pictures-itemID.json', {
      status: 200,
      response: {
        item_id: 3,
        item_pictures: [
          {
            large: 'https://picsum.photos/750/1000',
            normal: 'https://picsum.photos/340/270',
            thumbnail: 'https://picsum.photos/75/75',
          },
        ],
      },
    });

    return supertest(app)
      .get('/reviews/all/3')
      .then((response) => {
        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
          mainImage: 'https://picsum.photos/75/75',
          avgRating: 3.5,
          reviewsArray: [
            {
              ...REVIEW_1,
              userPicture: 'user90.jpg',
              reviewPicture: 'review90.jpg',
            },
            {
              ...REVIEW_2,
              userPicture: 'user94.jpg',
              reviewPicture: 'review94.jpg',
            }],
        });

        expect(db.query).toHaveBeenCalledWith(
          'SELECT * FROM reviews WHERE product_id = ?',
          ['3'],
          expect.any(Function),
        );
      });
  });
});
