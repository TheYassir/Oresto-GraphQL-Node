const debug = require('debug')('app:resolver:city');

const city = {
  // Par défaut les types scalaires on une fonction de résolution qui renvoie la valeur de la
  // propriété. Mais on peut la surcharger
  name(parent) {
    return parent.name.slice(0, 1).toUpperCase() + parent.name.slice(1).toUpperCase();
  },

  restaurants(parent, _, { dataSources }) {
    debug('restaurants');
    return dataSources.restoDB.restaurant.findByCity(parent.id);
  },

  async weather(parent, _, { dataSources }) {
    const rows = await dataSources.weatherAPI.findWeatherByGeopos(parent.geopos);
    return { daily: rows };
  },
};

module.exports = city;
