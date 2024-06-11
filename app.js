const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dbgr = require("debug")("development:mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");

// Environment variables configuration
const env = require("dotenv");
require("dotenv").config();

// Data base configuration
const databaseConnection = require("./config/mongoose-connection");

const app = express();

// view engine configuration
app.set("view engine", "ejs");

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(flash());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes requries
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const ownerRouter = require("./routes/ownerRouter");
const indexRouter = require("./routes/indexRouter");

// Routes configuration
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/owners", ownerRouter);

app.listen(process.env.PORT, () => {
  dbgr("Server is running on port 3000");
});
