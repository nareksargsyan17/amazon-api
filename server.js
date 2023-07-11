const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api");
const bodyParser = require('body-parser');

const app = express();
const port = 3001;


const corsOption = {
    origin: "https://localhost:8081"
}

//middleware

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//routers

app.use("/api", apiRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})