const express = require("express");
const cors = require("cors");
const router = require("./routes/productRouter.js")


const app = express();
const port = 3000;


const corsOption = {
    origin: "https://localhost:8081"
}

//routers

app.use("/api/products", router);


//middleware

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended : true}));


//api

app.get('/', (req, res) => {
    res.json({message : "wow"})
})

//


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})