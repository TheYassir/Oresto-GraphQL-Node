const { GraphQLError } = require('graphql');

module.exports = {

  async addRestaurant(_, args, { dataSources }) {
    const { input } = args;
    const row = await dataSources.restoDB.restaurant.create(input);
    return row;
  },

  async updateRestaurant(_, args, { dataSources }) {
    const { id, input } = args;
    const row = await dataSources.restoDB.restaurant.update(id, input);
    return row;
  },

  async deleteRestaurant(_, args, { dataSources }) {
    const { id } = args;
    const result = await dataSources.restoDB.restaurant.delete(id);
    return result;
  },

  async addCity(_, args, { dataSources }) {
    const { input } = args;
    const row = await dataSources.restoDB.city.create(input);
    return row;
  },

  async updateCity(_, args, { dataSources }) {
    const { id, input } = args;
    const row = await dataSources.restoDB.city.update(id, input);
    return row;
  },

  async deleteCity(_, args, { dataSources }) {
    const { id } = args;
    const restaurants = await dataSources.restoDB.restaurant.findByCity(id);
    if (restaurants.length) {
      throw new GraphQLError(
        'Restaurants are present in this city',
        {
          extensions: {
            code: 'BAD_USER_INPUT',
            http: {
              status: 400,
            },
          },
        },
      );
    }
    const result = await dataSources.restoDB.city.delete(id);
    return result;
  },

  async addCookingStyle(_, args, { dataSources }) {
    const { input } = args;
    const row = await dataSources.restoDB.cookingStyle.create(input);
    return row;
  },

  async updateCookingStyle(_, args, { dataSources }) {
    const { id, input } = args;
    const row = await dataSources.restoDB.cookingStyle.update(id, input);
    return row;
  },

  async deleteCookingStyle(_, args, { dataSources }) {
    const { id } = args;
    const restaurants = await dataSources.restoDB.restaurantHasCookingStyle.findByCookingStyle(id);
    if (restaurants.length) {
      throw new GraphQLError(
        'Restaurants are present with this cooking style',
        {
          extensions: {
            code: 'BAD_USER_INPUT',
            http: {
              status: 400,
            },
          },
        },
      );
    }
    const result = await dataSources.restoDB.cookingStyle.delete(id);
    return result;
  },

  async addRestaurantHasCookingStyles(_, args, { dataSources }) {
    const { restaurant_id: id, input } = args;

    // Ce n'est pas la version optimale car, elle execute plusieurs requête SQL, là où on pourrait
    // le faire en une seule. Mais pour le moment, on va faire simple et efficace.
    const promises = input.cooking_styles.map(
      (cookingStyle) => dataSources.restoDB.restaurantHasCookingStyle.create({
        restaurant_id: id,
        cooking_style_id: cookingStyle.cooking_style_id,
      }),
    );
    await Promise.all(promises);

    const row = await dataSources.restoDB.restaurant.findByPk(id);
    return row;
  },

  async deleteRestaurantHasCookingStyles(_, args, { dataSources }) {
    const {
      restaurant_id: restaurantId,
      cooking_style_ids: cookingStyleIds,
    } = args;

    await dataSources.restoDB.restaurantHasCookingStyle.delete(restaurantId, cookingStyleIds);

    const row = await dataSources.restoDB.restaurant.findByPk(restaurantId);

    return row;
  },

};
