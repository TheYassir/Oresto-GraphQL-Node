const CoreDatamapper = require('./coreDatamapper');

class CookingStyle extends CoreDatamapper {
  tableName = 'cooking_style';

  constructor(db) {
    super(db);
    this.createCoreLoaders();
  }
}

module.exports = CookingStyle;
