import categoryModel from "./categoryModel.js";

export  default (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
          type : DataTypes.TEXT,
        },
        brand : {
          type : DataTypes.STRING,
          allowNull : false
        },
        price : {
            type : DataTypes.INTEGER,
            allowNull:  false
        }
    })

    const Category = categoryModel(sequelize, DataTypes);
    Product.belongsTo(Category);
    return Product;
}