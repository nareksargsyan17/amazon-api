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
      const { Product } = models;

      this.hasMany(Product, {
        foreignKey: "userId",
        as: "products"
      })
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
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};