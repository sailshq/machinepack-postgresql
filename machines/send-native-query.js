module.exports = {


  friendlyName: 'Send native query',


  description: 'Send a native query to the PostgreSQL database.',


  inputs: {

    connection: {
      friendlyName: 'Connection',
      description: 'An active database connection.',
      extendedDescription: 'The provided database connection instance must still be active. Only database ' +
        'connection instances created by the `getConnection()` machine in this driver are supported.',
      example: '===',
      required: true
    },

    nativeQuery: {
      description: 'A SQL statement as a string (or to use parameterized queries, this should be provided as a dictionary).',
      extendedDescription: 'If provided as a dictionary, this should contain `sql` (the SQL statement string; ' +
        'e.g. \'SELECT * FROM dogs WHERE name = $1\') as well as an array of `bindings` (e.g. [\'Rover\']).',
      moreInfoUrl: 'https://github.com/brianc/node-postgres/wiki/Prepared-Statements#parameterized-queries',
      whereToGet: {
        description: 'This is oftentimes compiled from Waterline query syntax using "Compile statement", however it ' +
          'could also originate from userland code.'
      },
      example: '*',
      required: true
    },

    meta: {
      friendlyName: 'Meta (custom)',
      description: 'Additional stuff to pass to the driver.',
      extendedDescription: 'This is reserved for custom driver-specific extensions. Please refer to the documentation ' +
        'for the driver you are using for more specific information.',
      example: '==='
    }

  },


  exits: {

    success: {
      description: 'The native query was executed successfully.',
      outputVariableName: 'report',
      outputDescription: 'The `result` property is the result data the database sent back. The `meta` property is ' +
        'reserved for custom driver-specific extensions.',
      moreInfoUrl: 'https://github.com/brianc/node-postgres/wiki/Query#result-object',
      example: {
        result: '===',
        meta: '==='
      }
    },

    queryFailed: {
      description: 'The database returned an error when attempting to execute the native query.',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance with more details about what went wrong. ' +
        'The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    },

    badConnection: {
      friendlyName: 'Bad connection',
      description: 'The provided connection is not valid or no longer active. Are you sure it was obtained by calling ' +
        'this driver\'s `getConnection()` method?',
      extendedDescription: 'Usually, this means the connection to the database was lost due to a logic error or timing ' +
        'issue in userland code. In production, this can mean that the database became overwhelemed or was shut off while ' +
          'some business logic was in progress.',
      outputVariableName: 'report',
      outputDescription: 'The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        meta: '==='
      }
    }

  },


  fn: function sendNativeQuery(inputs, exits) {
    var _ = require('lodash');
    var debug = require('debug')('query');
    var validateConnection = require('../helpers/validate-connection');

    // Validate provided connection.
    if (!validateConnection({ connection: inputs.connection }).execSync()) {
      return exits.badConnection();
    }

    // Validate provided native query.
    // (supports raw SQL string or dictionary consisting of `sql` and `bindings` properties)
    var sql;
    var bindings = [];

    if (_.isString(inputs.nativeQuery)) {
      sql = inputs.nativeQuery;
    } else if (_.isObject(inputs.nativeQuery) && _.isString(inputs.nativeQuery.sql)) {
      sql = inputs.nativeQuery.sql;
      if (_.isArray(inputs.nativeQuery.bindings)) {
        bindings = inputs.nativeQuery.bindings;
      }
    } else {
      return exits.error(new Error('Provided `nativeQuery` is invalid. Please specify either a string of raw SQL or a ' +
        'dictionary like `{sql: \'SELECT * FROM dogs WHERE name = $1\', bindings: [\'Rover\']}`.'));
    }


    // Send native query.
    debug('Running SQL Query:');
    debug('SQL: ' + sql);
    debug('Bindings: ' + bindings);
    debug('Connection Id: ' + inputs.connection.id);
    inputs.connection.query(sql, bindings, function query(err, result) {
      if (err) {
        return exits.queryFailed({
          error: err,
          meta: inputs.meta
        });
      }

      // While we _could hypothetically_ just return `result.rows`, for
      // completeness we currently include the other (albeit less-documented)
      // properties sent back on `result` from node-postgres; e.g. `oid`.
      //
      // For more information, see:
      //  • https://github.com/brianc/node-postgres/wiki/Query#result-object
      return exits.success({
        result: {
          command: result.command,
          rowCount: result.rowCount,
          oid: result.oid,
          rows: result.rows
        },
        meta: inputs.meta
      });
    });
  }


};
