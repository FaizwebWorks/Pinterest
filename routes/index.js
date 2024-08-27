var express = require("express");
var router = express.Router();
const userModel = require("../models/user.schema");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res, next) {
  res.render("index", { title: "Pinterest" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Pinterest | Register" });
});

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile", { title: "Pinterest | Profile" });
});

router.post("/register", async (req, res, next) => {
  try {
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
    });

    userModel.register(user, req.body.password).then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      });
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/profile",
  }),
  (req, res, next) => {}
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
