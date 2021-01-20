const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports = function(app) {
  const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong : " + err);
  };

  const upload = multer({
    dest: "../uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });

  app.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      const tempPath = req.file.path;

      // make sure user's upload directory exists

      const userDir = "./public/uploads/" + req.user.email;
      console.log(userDir);

      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
      }

      const targetPath = path.join(
        __dirname,
        "../public/uploads/" + req.user.email + "/temp-image.png"
      );

      if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
          if (err) {
            return handleError(err, res);
          }

          res.end();
          /*
            .contentType("text/plain")
            .end("File uploaded!") */
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) {
            return handleError(err, res);
          }

          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
    }
  );
};
