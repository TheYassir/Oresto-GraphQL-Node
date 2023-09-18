const debug = require('debug')('app:resolver:city');

const restaurant = {
  city(parent, _, { dataSources }) {
    return dataSources.restoDB.city.findByPk(parent.city_id);
  },
  manager(parent, _, { dataSources }) {
    debug('manager');
    return dataSources.restoDB.manager.findByPk(parent.manager_id);
  },
  restaurantHasCookingStyles(parent, _, { dataSources }) {
    debug('restaurantHasCookingStyles');
    return dataSources.restoDB.RestaurantHasCookingStyle.findByRestaurant(parent.id);
  },
};

module.exports = restaurant;
