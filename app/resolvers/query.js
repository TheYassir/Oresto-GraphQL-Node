const debug = require('debug')('app:resolver:query');

const query = {
  async cities(_, __, { dataSources }) {
    debug('cities');
    // Technique de récupération permettant un traitement après celle-ci.
    const rows = await dataSources.restoDB.city.findAll();
    return rows;
  },
  // Pour les arguments ou les objets en général dans les paramètres de fonction, on peut récupérer
  // l'objet complet et l'utiliser ensuite avec chaque nom de propriété
  city(_, args, { dataSources }) {
    debug('city');
    // Technique plus courte et rapide, mais ne permttant pas d'agir sur le retour du .
    return dataSources.restoDB.city.findByPk(args.id);
  },
  restaurants(_, __, { dataSources }) {
    debug('restaurants');
    return dataSources.restoDB.restaurant.findAll();
  },
  // On peut également "spread" les objets, dans les paramètres de function, pour récupérer les
  // propriétés directement
  restaurant(_, { id }, { dataSources }) {
    debug('restaurant');
    return dataSources.restoDB.restaurant.findByPk(id);
  },

  /* managers() {
    debug('managers');
    return manager.findAll();
  }, */
  async manager(_, args, { dataSources }) {
    debug('manager');
    const row = await dataSources.restoDB.manager.findByPk(args.id);
    // todo restreindre le retour de l'email en fonction de la personne qui demande les infos
    return row;
  },

  cookingStyles(_, __, { dataSources }) {
    debug('cookingStyles');
    return dataSources.restoDB.cookingStyle.findAll();
  },
  async cookingStyle(_, args, { dataSources }) {
    debug('cookingStyle');
    const rows = await dataSources.restoDB.cookingStyle.findByPk(args.id);
    return rows;
  },
};

module.exports = query;
