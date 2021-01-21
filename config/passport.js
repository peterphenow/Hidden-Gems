const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
FacebookStrategy = require("passport-facebook").Strategy;
const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    (email, password, done) => {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(dbUser => {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      // we need to move these to environment variables
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

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
