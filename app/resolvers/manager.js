const manager = {
  restaurants(parent, _, { dataSources }) {
    return dataSources.restoDB.restaurant.findByManager(parent.id);
  },
};

module.exports = manager;
