const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");

router.get("/profile", passport.checkAuthentication,userController.profile);
router.get("/post", userController.post);
router.get("/signup", userController.signup);
router.get("/signin", userController.signin);

router.post("/create", userController.create);

//use passport as middleware to authenticate
router.post("/create-session", passport.authenticate(
    "local",
    {failureRedirect: "/users/signin"},

), userController.createSessions);


router.get("/signout", userController.destroySession);

module.exports = router;