module.exports = {
  async restaurant(parent, _, { dataSources }) {
    const row = await dataSources.restoDB.restaurant.findByPk(parent.restaurant_id);
    return row;
  },
};
