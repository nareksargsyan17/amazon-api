"use strict";
const {
  Model, STRING
} = require("sequelize");
module.exports = (sequelize) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Product, Product_Size } = models;

      this.belongsToMany(Product, {through: Product_Size, foreignKey: "sizeId"});
    }
  }
  Size.init({
    size: {
      type: STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: "Size",
    tableName: "size",
    timestamps: false,
    freezeTableName: true
  });
  return Size;
};