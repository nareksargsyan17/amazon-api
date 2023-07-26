"use strict";
const fs = require('fs');
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
      const { Category, Image, User, Order, Cart } = models;

      this.belongsTo(Category, {
        foreignKey: "categoryId",
        as : "category",
        onDelete: "cascade"
      });

      this.belongsTo(User, {
        foreignKey: "userId",
        as: "owner",
        onDelete: "cascade"
      });

      this.hasMany(Image, {
        foreignKey: "productId",
        as: "images",
        onDelete: "cascade",
        hooks: true
      });

      this.hasMany(Cart, {
        foreignKey: "productId",
        as: "cart"
      })

      this.belongsToMany(User, {through: Order, foreignKey: "productId", otherKey: "userId"});
      this.beforeBulkDestroy(async (data) => {
        const images = await Image.findAll({ where: { productId : data.where.id } });
        images.forEach(elem => {
            fs.unlinkSync(elem.dataValues.path);
        })
      });
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