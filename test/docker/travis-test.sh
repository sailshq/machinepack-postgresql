#!/bin/bash

# We use the mssql npm module CLI to set up the database. It required a JSON config file with connection details.
echo "{\"user\":\"sa\", \"password\":\"$SA_PASSWORD\", \"server\": \"$MSSQL_HOST\", \"database\":\"master\"}" \
    > .mssql.json

cat .mssql.json

node --version

./node_modules/mssql/bin/mssql < test/docker/sqlserver.setup.sql
