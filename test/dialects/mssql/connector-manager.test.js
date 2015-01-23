'use strict';

var chai = require('chai')
  , expect = chai.expect
  , Support = require(__dirname + '/../../support')
  , dialect = Support.getTestDialect()
  , Sequelize = require('../../../index')
  , Promise = Sequelize.Promise;

chai.config.includeStack = true;

if (dialect === 'mssql') {
  describe('[MSSQL Specific] Connector Manager', function() {

    it('should handle the fact that tedious does synchronous callbacks for Request objects', function() {
      var sequelize = Support.createSequelizeInstance({pool: {min: 1, max: 1, handleDisconnects: true, idle: 5000}})
        , cm = sequelize.connectionManager;

      return sequelize.sync()
        .then(function() {
          return Promise.all([
              sequelize.query("SELECT @@VERSION as 'version'"),
              sequelize.query("SELECT @@VERSION as 'version'"),
              sequelize.query("SELECT @@VERSION as 'version'"),
              sequelize.query("SELECT @@VERSION as 'version'"),
              sequelize.query("SELECT @@VERSION as 'version'")
            ]).then(function(results) {
              expect(results).to.have.length(5);
            });
        });
    });

  });
}
