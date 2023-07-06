"use strict";
const {
  Model, INTEGER
} = require("sequelize");
module.exports = (sequelize) => {
  class Product_Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Size.init({
    productId: {
      type: INTEGER,
      allowNull: false,
      reference: {
        model: "product",
        key: "id"
      }
    },
    sizeId: {
      type: INTEGER,
      allowNull: false,
      reference: {
        model: "size",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: "Product_Size",
    tableName: "product_size",
    timestamps: false,
    freezeTableName: true
  });
  return Product_Size;
};