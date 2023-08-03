'use strict';
const {
  Model, INTEGER, STRING, DATE
} = require('sequelize');
module.exports = (sequelize) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Address, User, Product } = models;

      this.belongsTo(Address, { foreignKey: "addressId", as: "addresses" })
      //
      this.belongsTo(User, { as: "users" })
      //
      this.belongsTo(Product, { foreignKey: "productId", as: "products"  })
    }
  }
  Order.init({
    productId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id"
      }
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    color: {
      type: STRING
    },
    size: {
      type: STRING
    },
    count: {
      type: INTEGER,
      defaultValue: 1
    },
    addressId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "addresses",
        key: "id"
      }
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
    sequelize,
    freezeTableName: true,
    modelName: 'Order',
    tableName: "orders",
  });
  return Order;
};