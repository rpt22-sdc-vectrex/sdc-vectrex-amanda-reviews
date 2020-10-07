# Hack Reactor FEC Project - Etsy Item Page

## Description
This is a remake of the reviews module of Etsy's item page for Hack Reactor's Front End Capstone Project.

Technologies used:
* Node.js
* React
* Express
* MySQL

## Instructions

### Setup
First copy the .envsample file in the root folder and rename it to .env. Replace MYSQL_USERNAME and MYSQL_PASSWORD with your credentials.

### Seeding
For database seeding run: `npm run db:setup`.

### Server
For Express server run: `npm start`.

### Client
For Webpack run: `npm run react-dev`.

## API
GET /reviews-service : returns JSON object of all reviews-service data

GET /reviews-service/:review-id : returns JSON object of review data for a specific review

POST /reviews-service : creates a new review

PUT /reviews-service : updates review data for review corresponding to the review id

DELETE /reviews-service : deletes review from database corresponding to the review id

