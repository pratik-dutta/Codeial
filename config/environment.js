const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: logDirectory
});

const development = {
    name: "development",
    asset_path: "./assets",
    session_cookie_key: "blahblahsomething",
    db: "codeial_development",
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "****",
            pass: "****"
        } 
    },
    google_clientID: "********************************************",
    google_clientSecret: "**********",
    //see in desktop file for API
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "codeial",

    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production = {
    name: "production",
    //not able to det environment variables for production
    // asset_path: process.env.ASSET_PATH, //$env:ASSET_PATH="./assets",
    // session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    // db: process.env.CODEIAL_DB,
    // smtp: {
    //     service: "gmail",
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: "****", //not initialized the username for gmail 
    //         pass: "****" // not initialized the password of mail in environment
    //     } 
    // },
    // google_clientID: "********************************************", // not initialized in environment
    // google_clientSecret: "**********", // not initialized in environment
    // //see in desktop file for API
    // google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    // jwt_secret: process.env.CODEIAL_JWT_SECRET
    asset_path: "./assets",
    session_cookie_key: "blahblahsomething",
    db: "codeial_production",
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "****",
            pass: "****"
        } 
    },
    google_clientID: "********************************************",
    google_clientSecret: "**********",
    //see in desktop file for API
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "codeial",
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);