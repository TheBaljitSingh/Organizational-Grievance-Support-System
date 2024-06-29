const express = require("express");
const bodyParser = require("body-parser");
const userSchema = require('./models/userModel')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


//route importing
const user = require("./Routes/userRoute");



app.use("/api/v1", user);




app.get("/", function(req, res){
    res.send("Services is up and running")
})


module.exports = app;
