var assert = require('assert');
var pg = require('pg');
var Pack = require('../../');

describe('Connectable ::', function() {
  describe('Get Connection', function() {
    var manager;

    // Create a manager
    before(function(done) {
      // Needed to dynamically get the host using the docker container
      var host = process.env.POSTGRES_1_PORT_5432_TCP_ADDR || 'localhost';

      Pack.createManager({
        connectionString: 'postgres://mp:mp@' + host + ':5432/mppg'
      })
      .exec(function(err, result) {
        if (err) {
          return done(err);
        }

        manager = result;
        return done();
      });
    });

    it('should successfully return a PG Client instance', function(done) {
      Pack.getConnection({
        manager: manager
      })
      .exec(function(err, result) {
        if (err) {
          return done(err);
        }

        // Assert that the result has a client object
        assert(result.connection);

        // Assert that a PG Client is returned
        assert(result.connection instanceof pg.Client);

        // Assert that the connection has a release function
        assert(result.connection.release);

        return done();
      });
    });
  });
});
