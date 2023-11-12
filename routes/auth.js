// contain authentication-related routes
import express from "express";
import passport from "passport";
import User from "../db.js";
import LocalStrategy from "passport-local";

import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, cb) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          console.log("No such user with that email found.");
          return cb(null, false, {
            message: "No such user with that email found.",
          });
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashed_password
        );

        if (!passwordMatch) {
          console.log("Incorrect email or password.");
          return cb(null, false, { message: "Incorrect email or password." });
        }

        console.log("Validation passed");
        return cb(null, user);
      } catch (err) {
        console.error(err);
        return cb(err);
      }
    }
  )
);

var router = express.Router();

router.get("/login", function (req, res, next) {
  res.render("login");
});

/* See: https://www.passportjs.org/concepts/authentication/password/
Note: cb(error, user, message) - message describes why authentication failed.
 */

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

export default router;