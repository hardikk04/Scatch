const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  products: {
    type: Array,
    default: [],
  },
  picture: {
    type: String,
  },
  gstin: {
    type: String,
  },
});

module.exports = mongoose.model("owner", ownerSchema);
