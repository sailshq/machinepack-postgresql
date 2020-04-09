#!/bin/bash
echo `pwd`
/opt/mssql-tools/bin/sqlcmd -S localhost,1433 -U sa -P Password1 -i test/docker/sqlserver.setup.sql
