'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Product } = models;
      this.belongsTo(Product, {
        foreignKey: "productId",
        onDelete : "cascade",
      })
    }
  }
  Image.init({
    path: {
      type: STRING
    },
    productId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      }
    },
    isMain: {
      type: BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName : true,
    sequelize,
    modelName: 'Image',
    tableName: "images",
    timestamps: false
  });
  return Image;
};