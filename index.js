const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css"
}));

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());


app.use(express.static("./assets"));

//using layout
app.use(expressLayout);

//extracting styles and script from sub-pages to layout 
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");


//mongo store is used to store session cookie in the db
app.use(session({
    name: "codeial",
    //TODO change it before production
    secret: "blahblahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: "disabled"
        },function(err){
            console.log(err || "mongostore setup OK");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
//set the user authentication
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use exress router
app.use("/", require("./routes/index"));



app.listen(port, function(err){
    if(err){
        console.log("Error : ", err);
    }
    console.log(`Server running succesfull at port: ${port}`);
});