#!/bin/bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -i /tmp/sqlserver.setup.sql
