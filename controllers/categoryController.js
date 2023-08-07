const { Category, Product, Image } = require("../models");
const { categorySchema } = require("../validations/categorySchema");

const addCategory = async (req, res) => {
  try {
    const { ...data } = req.body;
    await categorySchema.validateAsync(data);
    await Category.create(data);

    return res.status(200).send({
      successMessage: "Created"
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { parentId: null }});
    const data = [];
    for (const index in categories) {
      const category = await Category.findByPk(categories[index].id);
      const subCategories = await category.getSubCategories();
      const subData = subCategories.map(elem => {
        return {
          key: elem.id,
          title: elem.name,
          children: []
        }
      })

      data.push({key: category.id, title: category.name, children: subData});

      for (let i = 0; i < data[index].children.length; i++) {
        const subCategories = await Category.findAll({where: { parentId : data[index].children[i].key }});
        const subData = subCategories.map(elem => {
          return {
            key: elem.id,
            title: elem.name,
          }
        })
        data[index].children[i].children.push(...subData);
      }
     }

    return res.status(200).send({data : data});
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { category } = req;
    const subCategories = await category.getSubCategories();

    return res.status(200).send({category, subCategories});
  } catch (error) {
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = [];
    const category = await Category.findByPk(id, { include: [{ model: Product, as: "products", include: [{ model: Image, as: "images", where: { isMain: true } }] }]});
    products.push(category.id);
    await subcategory(category);

    async function subcategory(category) {
      try {
        const subCategories = await Category.findAll({
          where: { parentId: category.id },
          include: [
            {
              model: Product,
              as: "products",
              include: [{
                  model: Image,
                  as: "images",
                  where: {
                    isMain: true
                  }
                }]
            }]
        });
        subCategories.forEach(child => {
          products.push(child.id);
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

    return res.status(200).send(products);
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}


const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    console.log(id)
    await categorySchema.validateAsync(data);
    await Category.update(
      data,
      {
        where: { id },
      })
    const updatedCategory = await Category.findByPk(id);

    return res.status(200).send(updatedCategory);
  } catch (error) {

    return res.status(500).send({
      message: error.message
    });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id }})

    return res.send({
      message: "Deleted Size by id:" + id
    });
  } catch (error) {

    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

module.exports = {
  addCategory,
  getAllCategories,
  getCategory,
  getProductsByCategory,
  updateCategory,
  deleteCategory
}