#!/bin/bash

# run generateReviews func
now=$(date)
echo start time is: $now
node database/generate.js 5000000 --wait
now=$(date)
echo records were inserted. end time is: $now