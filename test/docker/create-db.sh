
/tmp/wait-for-it.sh localhost:1433 -t 120 -- echo 'sqlserver up'
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /tmp/sqlserver.setup.sql
