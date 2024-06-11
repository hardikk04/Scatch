const express = require("express");
const productModel = require("../models/product-model");
const { isLoggedIn } = require("../middleware/isLoggedIn");

const router = express.Router();
const upload = require("../config/multer-config");

router.post("/create", isLoggedIn, upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Successfully created");
    res.redirect("/shop");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
