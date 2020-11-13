import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '60s', target: 1 },
    { duration: '60s', target: 10 },
    { duration: '60s', target: 100 },
    { duration: '60s', target: 300 },
    { duration: '60s', target: 500 },
    { duration: '60s', target: 600 },
    { duration: '60s', target: 800 },
    { duration: '60s', target: 1000 },
    { duration: '60s', target: 0 }
  ],
  rps: 1000
};

export default function () {
  const reviewsServiceUrl = 'http://localhost:8888/reviews-service/10000000';
  const postReviewsServiceUrl = 'http://localhost:8888/reviews-service/';
  let params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  let createReview = JSON.stringify({
    "username": "Lucy",
    "text": "Wonderful piece!",
    "rating": 5,
    "review_id": 56789
  });
  check(http.get(reviewsServiceUrl, params), {
    'status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);
  check(http.post(postReviewsServiceUrl, createReview, params), {
    'status is 201': (r) => r.status === 201,
  }) || errorRate.add(1);
  sleep(1);
}