const debug = require('debug')('app:datamapper:restaurant');
const CoreDatamapper = require('./coreDatamapper');

class Restaurant extends CoreDatamapper {
  tableName = 'restaurant';

  constructor(db) {
    super(db);
    this.createCoreLoaders();
  }

  async findByManager(managerId) {
    debug(`findByManager(${managerId})`);
    const query = this.db.query.from(this.tableName).where({ manager_id: managerId });
    const rows = await query.cache(process.env.CACHE_TTL);
    return rows;
  }

  async findByCity(cityId) {
    debug(`findByCity(${cityId})`);
    const query = this.db.query.from(this.tableName).where({ city_id: cityId });
    const rows = await query.cache(process.env.CACHE_TTL);
    return rows;
  }
}

module.exports = Restaurant;
