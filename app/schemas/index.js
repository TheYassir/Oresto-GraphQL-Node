const { readFileSync } = require('fs');
const path = require('path');
const os = require('os');

let schema = '';
[
  'restaurant',
  'manager',
  'city',
  'cookingStyle',
  'weather',
  'restaurantHasCookingStyle',
  'cookingStyleHasRestaurant',
  'query',
  'mutation',
  'cache',
].forEach((name) => {
  schema += readFileSync(path.join(__dirname, `./${name}.gql`)) + os.EOL;
});

module.exports = schema;
