var assert = require('assert');
var pg = require('pg');
var Pack = require('../../');

describe('Connectable ::', function() {
  describe('Create Manager', function() {
    it('should validate the connection string has a protocol', function(done) {
      Pack.createManager({
        connectionString: 'localhost:5432/mppg'
      })
      .exec(function(err) {
        assert(err);
        assert.equal(err.exit, 'malformed');

        return done();
      });
    });

    it('should successfully return a PG Pool instance', function(done) {
      Pack.createManager({
        connectionString: 'postgres://mp:mp@localhost:5432/mppg'
      })
      .exec(function(err, result) {
        if (err) {
          return done(err);
        }

        // Assert that the manager has a pool object
        assert(result.manager.pool);

        // Assert that a PG Pool is returned
        assert(result.manager.pool instanceof pg.Pool);

        // Assert that the manager has a connect function
        assert(result.manager.pool.connect);

        return done();
      });
    });
  });
});
