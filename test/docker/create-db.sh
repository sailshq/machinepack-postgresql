
echo "password.1=$SA_PASSWORD"
echo "password.2=$1"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $1 -d master -i /tmp/sqlserver.setup.sql
