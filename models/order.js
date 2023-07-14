'use strict';
const {
  Model, INTEGER
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

      this.belongsTo(Address, { foreignKey: "addressId", as: "address" })
      //
      this.belongsTo(User, { as: "user" })
      //
      this.belongsTo(Product, { foreignKey: "productId", as: "product"  })
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
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Order',
    tableName: "orders",
    timestamps: false
  });
  return Order;
};