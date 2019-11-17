#!/bin/bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -i /machinepack-sqlserver/sqlserver.setup.sql
