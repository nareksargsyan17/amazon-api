import productModel from "./productModel.js";

export default (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
      name : {
          type : DataTypes.STRING,
          allowNull : false
      }
    })
    const Product = productModel(sequelize, DataTypes);
    Category.hasMany(Product);

    return Category;
}