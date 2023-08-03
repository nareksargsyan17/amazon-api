'use strict';
const {
  Model, STRING, BOOLEAN
} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Product, Address, Order, Cart} = models;

      this.hasMany(Product, {
        foreignKey: "userId",
        as: "products",
        onDelete: "cascade"
      })

      this.hasMany(Address, { foreignKey: "userId", as: "addresses", onDelete: "cascade" });


      this.belongsToMany(Product, { through: Order, foreignKey: "userId", otherKey: "productId", onDelete: "cascade"});

      this.hasMany(Cart, {foreignKey: "userId", as: "cart", onDelete: "cascade"})
    }
  }
  User.init({
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: BOOLEAN,
      defaultValue: false
    },
    verified: {
      type: BOOLEAN,
      defaultValue: false
    },
    token: {
      type: STRING,
      defaultValue: null
    }
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};