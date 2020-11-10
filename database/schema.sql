DROP DATABASE IF EXISTS EtsyReviews;
CREATE DATABASE EtsyReviews;
USE EtsyReviews;

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL,
  date DATE NOT NULL,
  product_id INTEGER NOT NULL,
  user_profile_url VARCHAR(250) NOT NULL
);

DROP TABLE IF EXISTS product_to_stores;
CREATE TABLE product_to_stores (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  store_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS reviews_service;
CREATE TABLE reviews_service (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL,
  product_id INTEGER NOT NULL
);

LOAD DATA LOCAL INFILE 'review_data.txt' INTO TABLE reviews_service (
  username,
  text,
  rating,
  product_id
);

SHOW WARNINGS;