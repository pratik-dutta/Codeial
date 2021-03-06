const express = require("express");
const env = require("./config/environment");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const port = 8000;
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-startegy");
const passportGoogle = require("./config/passport-google-oauth2-startegy");

const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path = require("path");

if(env.name == "development"){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, "scss"),
        dest: path.join(__dirname, env.asset_path, "css"),
        debug: true,
        outputStyle: "expanded",
        prefix: "/css"
    }));
}


app.use(express.urlencoded({extended: true}));

app.use(cookieParser());


app.use(express.static(env.asset_path));

//for avatar static files( making uploads file available)
app.use("/uploads", express.static( __dirname + "/uploads"));

//for logger
app.use(logger(env.morgan.mode, env.morgan.options));

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
    secret: env.session_cookie_key,
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