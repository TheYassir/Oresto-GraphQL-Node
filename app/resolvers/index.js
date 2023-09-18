// Resolvers
const Query = require('./query');
const Mutation = require('./mutation');
const City = require('./city');
const Restaurant = require('./restaurant');
const Manager = require('./manager');
const CookingStyle = require('./cookingStyle');
const RestaurantHasCookingStyle = require('./restaurantHasCookingStyle');
const CookingStyleHasRestaurant = require('./cookingStyleHasRestaurant');

module.exports = {
  Query,
  Mutation,
  City,
  Restaurant,
  Manager,
  CookingStyle,
  RestaurantHasCookingStyle,
  CookingStyleHasRestaurant,
};
