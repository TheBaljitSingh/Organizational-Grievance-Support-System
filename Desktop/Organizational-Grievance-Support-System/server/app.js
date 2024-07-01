const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userSchema = require('./models/userModel')
const cors = require("cors")
const app = express();
const multer = require("multer");
require('dotenv').config();


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


//route importing
const user = require("./Routes/userRoute"); // here lets assume user is employee who want to raise a graivance ticket

app.use("/api", user);


app.get("/", function(req, res){
    res.send("Services is up and running")
})


module.exports = app;
