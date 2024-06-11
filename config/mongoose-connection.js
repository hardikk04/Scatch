const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");

mongoose
  .connect(`${config.get("MONGOOSE_URI")}/scatch`)
  .then(() => {
    dbgr("Connected to Mongoose");
  })
  .catch((err) => dbgr(err));

const db = mongoose.connection;

module.exports = db;
