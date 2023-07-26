'use strict';
const {
  Model, NUMBER, STRING, INTEGER, ENUM
} = require('sequelize');
module.exports = (sequelize) => {
  class Cart extends Model {
    static associate(models) {
      const { User, Product } = models
      this.belongsTo(Product, {
        foreignKey: "productId",
        onDelete : "cascade",
      })

      this.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "cascade"
      });
    }
  }
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    productId: {
      type: NUMBER,
      allowNull: false,
      references: {
        model: "products",
        key: "id"
      }
    },
    count: {
      type: NUMBER,
      allowNull: false
    },
    size: {
      type: STRING,
      allowNull: false
    },
    color: {
      type: STRING,
      allowNull: false
    },
    userId: {
      type: NUMBER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    type: {
      type: ENUM("cart", "saved"),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: "cart",
    timestamps: false,
    freezeTableName: true
  });
  return Cart;
};