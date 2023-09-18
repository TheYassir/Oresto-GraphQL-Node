const debug = require('debug')('app:resolver:cookingStyle');

const cookingStyle = {
  async cookingStyleHasRestaurants(parent, _, { dataSources }) {
    debug('cookingStylesHasRestaurant');
    const rows = await dataSources
      .restoDB
      .restaurantHasCookingStyle
      .findByCookingStyle(parent.id);
    return rows;
  },
};

module.exports = cookingStyle;
