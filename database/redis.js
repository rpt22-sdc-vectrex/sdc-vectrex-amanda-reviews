const redis = require('redis');

const REDIS_PORT = 6379;
const REDIS_URL = '0.0.0.0';

const client = redis.createClient(REDIS_PORT, REDIS_URL, {
  no_ready_check: true,
});

client.on('connect', function() {
  console.log('connected to redis');
});

//cache middleware
const cacheIds = (req, res, next) => {
  let id = req.params.id;
  client.get(id, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
};

module.exports = { client, cacheIds };

