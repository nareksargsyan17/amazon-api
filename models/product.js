'use strict';
const {
  Model, Sequelize, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey : "category_id",
        as: "category",
      })
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description : {
      type : Sequelize.TEXT,
    },
    brand : {
      type : Sequelize.STRING,
      allowNull : false
    },
    price : {
      type : Sequelize.INTEGER,
      allowNull:  false
    },
    isPublished : {
      type : Sequelize.BOOLEAN
    },
    category_id: {
      type: INTEGER,
      allowNull: false,
      reference: {
        model: 'Category',
        key: 'id',
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'product'
  });
  return Product;
};