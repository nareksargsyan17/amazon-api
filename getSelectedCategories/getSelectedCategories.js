const {Category} = require("../models");

module.exports = async function getSelectedCategories (id) {
  try {
    if (id === "all") {
      const categories = await Category.findAll();
      const categoriesId = categories.map(elem => elem.id)

      console.log(categoriesId)
      return categoriesId;
    } else {
      const categories = [];
      const category = await Category.findByPk(id);
      categories.push(category.id);
      await subcategory(category);

      async function subcategory(category) {
        try {
          const subCategories = await Category.findAll({
            where: {parentId: category.id}
          });
          subCategories.forEach(child => {
            categories.push(child.id);
          })
          for (let i = 0; i < subCategories.length; i++) {
            if (subCategories[i].id) {
              await subcategory(subCategories[i]);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      return categories;
    }
  } catch (error) {
    console.log(error)
  }
}
