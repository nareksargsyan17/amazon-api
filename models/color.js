"use strict";
const {
  Model, STRING
} = require("sequelize");
module.exports = (sequelize) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {Product, Product_Color} = models;

      this.belongsToMany(Product, {through : Product_Color, foreignKey: "colorId"})
    }
  }
  Color.init({
    color: {
      type: STRING,
      allowNull: false,
      unique : true
    }
  }, {
    sequelize,
    modelName: "Color",
    tableName: "color",
    freezeTableName: true,
    timestamps: false
  });
  return Color;
};