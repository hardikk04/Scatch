const epxress = require("express");
const ownerModel = require("../models/owner-model");
const { isLoggedIn } = require("../middleware/isLoggedIn");

const router = epxress.Router();

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const { email, password, fullname } = req.body;
    const owner = await ownerModel.find();
    if (owner.length > 0) {
      res.status(400).send("Owner already exists");
      return;
    }
    const newOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.send(newOwner);
  });

  router.get("/admin", isLoggedIn, (req, res) => {
    res.render("createproducts", { success: req.flash("success") });
  });
}
module.exports = router;
