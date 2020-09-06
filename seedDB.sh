#!/bin/bash
set -e # exit if there is an error
set -x # echo each command

mysql -u root < database/schema.sql
node database/seeder.js 800