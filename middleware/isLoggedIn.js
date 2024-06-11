const jwt = require("jsonwebtoken");
const isLoggedIn = (req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        req.flash("error", "Need to login first");
        return res.status(400).redirect("/");
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    req.flash("error", "Need to login first");
    return res.status(400).redirect("/");
  }
};

module.exports.isLoggedIn = isLoggedIn;
