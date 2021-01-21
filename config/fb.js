const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;
const db = require("../models");

passport.use(
  new FacebookStrategy(
    {
      clientID: "411866476566106",
      clientSecret: "f4a590e702fd960148f7eb3aa022bd8c",
      callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      db.User.findOrCreate({
        where: { email: profile.id + "@facebook.com" },
        defaults: { password: profile.id + "@facebook.com" }
      }).spread((user, created) => {
        console.log("profile returned by fb: " + profile);
        console.log(
          user.get({
            plain: true
          })
        );
        console.log("profile returned by fb: " + profile);
        console.log(created);

        done(null, user);
      });
    }
  )
);
