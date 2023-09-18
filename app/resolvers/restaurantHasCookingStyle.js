module.exports = {
  async cookingStyle(parent, _, { dataSources }) {
    const row = await dataSources.restoDB.cookingStyle.findByPk(parent.cooking_style_id);
    return row;
  },
};
