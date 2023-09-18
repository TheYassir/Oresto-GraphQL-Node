const CoreDatamapper = require('./coreDatamapper');

class Manager extends CoreDatamapper {
  tableName = 'manager';

  constructor(db) {
    super(db);
    this.createCoreLoaders();
  }
}

module.exports = Manager;
