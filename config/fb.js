const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;
const db = require("../models");

passport.use(
  new FacebookStrategy(
    {
      clientID: "411866476566106",
      clientSecret: "f4a590e702fd960148f7eb3aa022bd8c",
      callbackURL: "http://localhost:8080/auth/facebook/callback",
    },
    function(accessToken, refreshToken, profile, done) {
      db.User.findOrCreate(..., function(err, user) {
          if (err) {
            return done(err);
          }
          done(null, user);
        }
      );
    }
  )
);
