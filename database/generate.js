const faker = require('faker');
const connection = require('./index.js');
const fs = require('fs');

const args = process.argv.slice(2);
const count = parseInt(args[0]) || 0;

const reviewText = [
  'Absolutely beautiful and appears to be of great quality.',
  'The packaging was thoughtful and well done for its journey through usps.',
  'Thank you so much!',
  'So excited to receive my new vase.',
  'I love the quality and whimsical look.',
  'Such beautiful art!',
  'I am so pleased with these.',
  'So amazing!',
  'I am in love with this vase!!',
  'Way nicer than expected!',
  'Love this!',
  'These are such works of art.',
  'I am absolutely thrilled to have these.',
  'They were made earlier than expected which was a great surprise.',
  'Shipped so fast and sent these as a housewarming gift!',
  'They are beautiful.',
  'Shipped super fast.',
  'The vase is SO CUTE!!!',
  'I love it!',
  'MORE than stunning!',
  'Beyond gorgeous!',
  'Amazing piece!',
  'I really love it!',
  'Packaged with care.',
  'Shipped out very fast and arrived quickly.',
  'Very nice seller.',
  'thank you so much!',
  'When I opened the box with my first vase from and by Nicole it was more beautiful in person than in the picture.',
  'It is truly a special piece of art.',
  'I hope to be able to collect more.',
  'Too pretty for words.',
  'So happy with the purchase and quick delivery.',
  'Thank you!',
  'This piece is absolutely gorgeous and arrived quickly.',
  'Will definitely be purchasing more pieces in the future!',
  'Exactly what I wanted!',
  'Perfect sized tea cups.',
  'The ceramic does get a bit hot to hold since there is no handle but makes it easy to know if it will be too hot to drink!',
  'Design super original and modern.',
  'My friend loved the surprise (it was for a bday gift).',
  'Thank you for shipping it so fast!',
  'Absolutely perfect!',
  'Thank you for the lovely vase!',
  'It fits perfectly in my rustic mountain home and adds just the right touch of luxury.',
  'I ordered the 5” one and I will most certainly be ordering more.',
  'Absolutely love this bowl.',
  'Perfect for my new succulents.',
  'It is lovely!',
  'Seller was quick to ship and my beautiful new vase arrived days later neatly and safely packed.',
  'Finding joy in fresh spring flowers blooming while all is madness.',
  'Beautifully made and the perfect chic piece for my home.',
  'Love it!',
  'These vases are original!',
  'This bowl is lovely and of great quality.'
];

//agnostic data generation script
//txt file will have a tab delimited row for each of 10M reviews
function generateReviews(count) {
  let writeStream = fs.createWriteStream('review_data.txt', {
    //append batches to review_data.txt
    'flags': 'a'
  });
  for (let i = 1; i < count + 1; i += 1) {
    writeStream.write(`${faker.internet.userName().toLowerCase()}\t${faker.random.arrayElement(reviewText)}\t${faker.random.arrayElement([1, 2, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5])}\t${faker.random.number(10000000)}\n`);
  }
  writeStream.end(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('💄 5,000,000 written to file');
    }
  });
}

//generateReviews called 20x by generate.sh
generateReviews(count);