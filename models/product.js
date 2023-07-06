"use strict";
const {
  Model, INTEGER, STRING, TEXT, BOOLEAN, DATE
} = require("sequelize");
module.exports = (sequelize,) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Product_Color,  Category, Color, Size, Product_Size } = models;

      this.belongsTo(Category, {foreignKey : "categoryId"});

      this.belongsToMany(Color, {through: Product_Color, foreignKey : "productId"});

      this.belongsToMany(Size, {through: Product_Size, foreignKey: "productId"});
    }
  }
  Product.init({
    name: {
      type: STRING,
      allowNull: false,
    },
    description : {
      type : TEXT,
    },
    brand : {
      type : STRING,
      allowNull : false
    },
    price : {
      type : INTEGER,
      allowNull:  false
    },
    isPublished : {
      type : BOOLEAN
    },
    categoryId: {
      type: INTEGER,
      allowNull: false,
      reference: {
        model: "category",
        key: "id",
      }
    },
    createdAt: {
      allowNull: false,
      type: DATE
    },
    updatedAt: {
      allowNull: false,
      type: DATE
    },
  }, {
    freezeTableName: true,
    sequelize,
    modelName: "Product",
    tableName: "product"
  });
  return Product;
};