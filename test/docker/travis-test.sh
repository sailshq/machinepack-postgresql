#!/bin/bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password1 -i /tmp/sqlserver.setup.sql
