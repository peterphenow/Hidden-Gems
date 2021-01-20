// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const fs = require("fs");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/showmarkers", (req, res) => {
    db.Marker.findAll({}).then(markers => {
      res.json(markers);
    });
  });
  app.post("/api/addmarker", (req, res) => {
    db.Marker.create({
      markerName: req.body.markerName,
      markerLatitude: req.body.markerLatitude,
      markerLongitude: req.body.markerLongitude,
      markerInfo: req.body.markerInfo
    })
      .then(data => {
        console.log("marker successfully created.");
        /* console.log("checking for image upload...");
        console.log(data);
        const userDirTempFile =
          "public/uploads/" + req.user.email + "/temp-image.png";

        if (fs.existsSync(userDirTempFile)) {
          console.log("uploaded picture found!");
          // create file name with ID + IMG + 8 random chars
          const newFileName = getNewFileName(data.dataValues.id);
          // rename the file from userDir to newFileName
          fs.rename(
            userDirTempFile,
            "./public/uploads/" + req.user.email + "/" + newFileName,
            err => {
              if (err) {
                console.log("ERROR: " + err);
              }
            }
          );

          db.Marker.update(
            { markerPics: "uploads/" + req.user.email + "/" + newFileName },
            { where: { id: data.dataValues.id } }
          ).then(rowsUpdated => {
            console.log(rowsUpdated);
          });
        } else {
          console.log("no picture file found!");
        } */
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  function getNewFileName(id) {
    // select 8 characters at random from an array
    const finalArray = [];
    const randomCharsArray = "abcdefghijklmnopqrstuvwxyz123456790".split("");
    for (let index = 1; index < 9; index++) {
      const randomNumber = Math.floor(Math.random() * randomCharsArray.length);
      finalArray.push(randomCharsArray[randomNumber]);
    }
    console.log(finalArray);

    const newFileName = id + "IMG" + finalArray.join("") + ".png";
    console.log(newFileName);
    return newFileName;
  }
};
