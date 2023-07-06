"use strict";
const {
  Model, STRING
} = require("sequelize");
module.exports = (sequelize) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Product } = models;

      this.hasMany(Product, {
        foreignKey: "categoryId",
        as : "product"
      })
    }
  }
  Category.init({
    name: {
      type: STRING,
      allowNull: false,
    }
  }, {
    freezeTableName : true,
    sequelize,
    modelName: "Category",
    tableName: "category",
    timestamps: false
  });
  return Category;
};