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
    static associate(models) {}
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
    tableName: "sizes",
    timestamps: false,
    freezeTableName: true
  });
  return Size;
};