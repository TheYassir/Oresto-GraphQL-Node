const debug = require('debug')('app:coredatamapper');
const CoreDatamapper = require('./coreDatamapper');

class RestaurantHasCookingStyle extends CoreDatamapper {
  tableName = 'restaurant_has_cooking_style';

  constructor(db) {
    super(db);
    this.createCoreLoaders();
    this.restaurantLoader = this.db.query
      .from(this.tableName)
      .batch(async (query, restaurantIds) => {
        const rows = await query.whereIn('restaurant_id', restaurantIds);
        return restaurantIds.map(
          (restaurantId) => rows?.filter(
            (row) => row.restaurant_id === restaurantId,
          ),
        );
      });
    this.cookingStyleLoader = this.db.query
      .from(this.tableName)
      .batch(async (query, cookingStyleIds) => {
        const rows = await query.whereIn('cooking_style_id', cookingStyleIds);
        return cookingStyleIds.map(
          (cookingStyleId) => rows?.filter(
            (row) => row.cooking_style_id === cookingStyleId,
          ),
        );
      });
  }

  findByRestaurant(restaurantId) {
    return this.restaurantLoader.load(restaurantId);
  }

  findByCookingStyle(cookingStyleId) {
    return this.cookingStyleLoader.load(cookingStyleId);
  }

  async delete(restaurantId, cookingStyleIds) {
    debug(`delete(${restaurantId}, ${cookingStyleIds}) sur la table ${this.tableName}`);
    const query = this.db.query.from(this.tableName).where({ restaurant_id: restaurantId }).whereIn('cooking_style_id', cookingStyleIds).del();
    return !!await query;
  }
}

module.exports = RestaurantHasCookingStyle;
