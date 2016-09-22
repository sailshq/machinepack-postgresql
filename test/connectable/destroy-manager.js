var assert = require('assert');
var Pack = require('../../');

describe('Connectable ::', function() {
  describe('Destroy Manager', function() {
    var manager;

    // Create a manager
    before(function(done) {
      Pack.createManager({
        connectionString: 'postgres://mp:mp@localhost:5432/mppg'
      })
      .exec(function(err, result) {
        if (err) {
          return done(err);
        }

        manager = result;
        return done();
      });
    });


    it('should successfully destroy the manager', function(done) {
      Pack.destroyManager({
        manager: manager
      })
      .exec(function(err) {
        assert(!err);
        return done();
      });
    });
  });
});
