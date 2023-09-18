const CoreDatamapper = require('./coreDatamapper');

class City extends CoreDatamapper {
  tableName = 'city';

  constructor(db) {
    super(db);
    this.createCoreLoaders();
  }
}

module.exports = City;
