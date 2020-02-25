const express = require("express");
const app = express();
const port = 8000;
const expressLayout = require("express-ejs-layouts");

//using layout
app.use(expressLayout);

//use exress router
app.use("/", require("./routes/index"));

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function(err){
    if(err){
        console.log("Error : ", err);
    }
    console.log(`Server running succesfull at port: ${port}`);
});