import dbConfig from "../config/dbConfig.js";
import {Sequelize, DataTypes} from "sequelize";
import productModel from "./productModel.js";
import categoryModel from "./categoryModel.js";


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool : {
            max : dbConfig.pool.max,
            min : dbConfig.pool.min
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("conected database...");
    })
    .catch(er => {
        console.log(er);
    })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.products = productModel(sequelize, DataTypes);
db.categories = categoryModel(sequelize, DataTypes);

db.sequelize.sync({force : true})
.then(() => {
    console.log("sinc done")
})

export default db;