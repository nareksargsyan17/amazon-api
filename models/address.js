'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, Order } = models;

      this.belongsTo(User, { foreignKey: "userId", as: "addresses" });

      this.hasMany(Order, { foreignKey: "addressId", as: "orders" });
    }
  }
  Address.init({
    address: {
      type: STRING,
      allowNull: false
    },
    isMain: {
      type: BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Address',
    tableName: "addresses",
    timestamps: false,
    freezeTableName: true
  });
  return Address;
};