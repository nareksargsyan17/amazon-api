"use strict";
const {
  Model, INTEGER
} = require("sequelize");
module.exports = (sequelize) => {
  class Product_Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Color.init({
    productId: {
      type: INTEGER,
      allowNull: false,
      reference: {
        model : "product",
        key: "id"
      }
    },
    colorId : {
      type: INTEGER,
      allowNull: false,
      reference: {
        model : "color",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: "Product_Color",
    tableName: "product_color",
    freezeTableName: true,
    timestamps : false
  });
  return Product_Color;
};