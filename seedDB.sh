#!/bin/bash
set -e # exit if there is an error
set -x # echo each command

# load environment variables from .env
set -a
. ./.env
set +a

# load seeding script
mysql -u $MYSQL_USERNAME -p$MYSQL_PASSWORD < database/schema.sql