const faker = require('faker');
const connection = require('./index.js');

function seedDB(count) {
  const queryStrings = [];
  const queryArgs = [];
  const reviewText = [
    'Absolutely beautiful and appears to be of great quality. The packaging was thoughtful and well done for its journey through usps. Thank you so much!',
    'So excited to receive my new vase. I love the quality and whimsical look.',
    'Such beautiful art! I am so pleased with these.',
    'So amazing- in love with this vase!!',
    'Way nicer than expected! Love this!',
    'These are such works of art. I am absolutely thrilled to have these. They were also made earlier than expected which was a great surprise.',
    'Shipped so fast and sent these as a housewarming gift! They\'re beautiful.',
    'Shipped super fast, and the vase is SO CUTE!!! I love it<3',
    'MORE than stunning! Beyond gorgeous!',
    'Amazing piece, i really love it! packaged with care, shipped out very fast and arrived quickly. very nice seller, thank you so much!',
    'When I opened the box with my first vase from and by Nicole, it was more beautiful in person than in the picture. It is truly a special piece of art. I hope to be able to collect more.',
    'Too pretty for words. So happy with the purchase and quick delivery. Thank you!',
    'This piece is absolutely gorgeous and arrived quickly. Will definitely be purchasing more pieces in the future!',
    'Exactly what I wanted! Perfect sized tea cups. The ceramic does get a bit hot to hold since there\'s no handle, but makes it easy to know if it\'ll be too hot to drink!',
    'Design super original and modern. My friend loved the surprise (it was for a bday gift). Thank you for shipping it so fast! :)',
    'Absolutely perfect! Thank you for the lovely vase! It fits perfectly in my rustic mountain home and adds just the right touch of luxury. I ordered the 5” one and I will most certainly be ordering more.',
    'Absolutely love this bowl. Perfect for my new succulents.',
    'It\'s lovely! Seller was quick to ship and my beautiful new vase arrived days later, neatly and safely packed. Finding joy in fresh spring flowers blooming while all is madness.',
    'Beautifully made and the perfect chic piece for my home. Love it <3',
    'These vases are original, lovely and of great quality.',
  ];

  for (let i = 0; i < count; i += 1) {
    queryStrings.push('insert into reviews (username, text, rating, date, product_id, user_profile_url) values (?, ?, ?, ?, ?, ?);');
    queryArgs.push(faker.internet.userName().toLowerCase());
    queryArgs.push(faker.random.arrayElement(reviewText));
    queryArgs.push(faker.random.arrayElement([1, 2, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]));
    queryArgs.push(faker.date.past());
    queryArgs.push(faker.random.number({ min: 1, max: 100 }));
    queryArgs.push(faker.internet.url());
  }

  for (let i = 1; i < 101; i += 1) {
    queryStrings.push('insert into product_to_stores (store_id) values (?);');
    queryArgs.push(faker.random.number({ min: 1, max: 10 }));
  }

  for (let i = 1; i < 101; i += 1) {
    queryStrings.push('insert into reviews_service (rating, review_id) values (?, ?);');
    queryArgs.push(faker.random.arrayElement([1, 2, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]));
    queryArgs.push(faker.random.number({ min: 1, max: 100 }));
  }

  connection.query(queryStrings.join(''), queryArgs, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Records were inserted.');
    }
    connection.end();
  });
}

function main() {
  const recordCount = process.argv[2];
  seedDB(recordCount);
}

main();
