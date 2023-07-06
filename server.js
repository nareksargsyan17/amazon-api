const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");
const colorRouter = require("./routes/colorRouter");
const sizeRouter = require("./routes/sizeRouter");


const app = express();
const port = 3001;


const corsOption = {
    origin: "https://localhost:8081"
}

//middleware

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended : true}));


//routers

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/colors", colorRouter);
app.use("/api/sizes", sizeRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})