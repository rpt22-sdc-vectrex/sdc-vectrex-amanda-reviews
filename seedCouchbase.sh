#!/bin/bash
set -e # exit if there is an error

# cbimport csv
for i in {1..100}
do

/Applications/'Couchbase Server.app'/Contents/Resources/couchbase-core/bin/cbimport csv -c couchbase://127.0.0.1 -u root -p crazyroot -b etsy-reviews-service -d "file:///Users/tristanrhodes/rvrita-etsy-reviews/database/review_data.csv" -f list --g key::%id%

echo $i
done
