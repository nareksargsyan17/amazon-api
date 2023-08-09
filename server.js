const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api");
const webhookRouter = require("./routes/api/auth/user/webhookRouter")
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const port = 3001;


const corsOption = {
    origin: "*"
}

//middleware

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({extended : true}));
// inside public directory.

app.use(express.static('public'));
app.use('/public', express.static('public'));
//routers

app.use("/api/users/orders", webhookRouter);
app.use(bodyParser.json());

app.use("/api", apiRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})