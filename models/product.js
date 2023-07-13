"use strict";
const {
  Model, INTEGER, STRING, TEXT, BOOLEAN, DATE, JSON
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
      const { Category, Image, User, Order } = models;

      this.belongsTo(Category, {
        foreignKey: "categoryId",
        onDelete: "cascade"
      });

      this.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "cascade"
      });

      this.hasMany(Image, {
        foreignKey: "productId",
        as: "images",
        onDelete: "cascade"
      });

      this.belongsToMany(User, {through: Order, foreignKey: "productId"});
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
      references: {
        model: "categories",
        key: "id",
      },
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    colors: {
      type: JSON,
      allowNull: false
    },
    sizes: {
      type: JSON,
      allowNull: false
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
    tableName: "products",
  });

  return Product;
};