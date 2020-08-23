const faker = require('faker');
const connection = require('./index.js');

function seedDB(count) {
  const queryStrings = [];
  const queryArgs = [];

  for (let i = 0; i < count; i += 1) {
    queryStrings.push('insert into reviews (username, text, rating, date, product_id, user_profile_url) values (?, ?, ?, ?, ?, ?);');
    queryArgs.push(faker.internet.userName().toLowerCase());
    queryArgs.push(faker.lorem.sentence());
    queryArgs.push(faker.random.arrayElement([1, 1, 2, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]));
    queryArgs.push(faker.date.past());
    queryArgs.push(faker.random.number({ min: 1, max: 100 }));
    queryArgs.push(faker.internet.url());
  }

  for (let i = 1; i < 101; i += 1) {
    queryStrings.push('insert into product_to_stores (store_id) values (?);');
    queryArgs.push(faker.random.number({ min: 1, max: 10 }));
  }

  connection.query(queryStrings.join(''), queryArgs, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Records were was inserted.');
    }
    connection.end();
  });
}

function main() {
  const recordCount = process.argv[2];
  seedDB(recordCount);
}

main();
