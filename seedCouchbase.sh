#!/bin/bash
set -e # exit if there is an error

#time before seeding
now=$(date)
echo start time is: $now

# cbimport csv

/Applications/'Couchbase Server.app'/Contents/Resources/couchbase-core/bin/cbimport csv -c http://127.0.0.1:8091 -u root -p crazyroot -b 'etsy-reviews-service' -d 'file:///Users/tristanrhodes/rvrita-etsy-reviews/review_data.csv' -g key::id



#time after seeding
now=$(date)
echo records were inserted. end time is: $now
