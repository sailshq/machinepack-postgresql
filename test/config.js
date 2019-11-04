const _ = require('@sailshq/lodash');

const config = {
  server: process.env.MSSQL_HOST || 'localhost',
  port: (function() {
    if (!_.isEmpty(process.env.MSSQL_PORT)) {
      return parseInt(process.env.MSSQL_PORT + '', 10);
    }
    return 1433;
  })(),
  user: process.env.MSSQL_USER || 'sails',
  password: process.env.MSSQL_PASSWORD || 'sails',
  database: process.env.MSSQL_DB || 'sails-test',
};

module.exports = {
  config: config
};
