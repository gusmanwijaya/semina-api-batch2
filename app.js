const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// START: Import install package
const cors = require("cors");
// END: Import install package

// START: Import router
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
// END: Import router

// START: Import middleware handle error
const notFound = require("./app/middlewares/not-found");
const handleError = require("./app/middlewares/handle-error");
// END: Import middleware handle error

const apiVersion = "/api/v1";

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${apiVersion}/cms/categories`, categoriesRouter);
app.use(`${apiVersion}/cms/images`, imagesRouter);

app.use("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

app.use(notFound);
app.use(handleError);

module.exports = app;
