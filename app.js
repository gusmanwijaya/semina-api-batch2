const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// START: Import install package
const cors = require("cors");
// END: Import install package

// START: Import router
const imagesRouter = require("./app/api/v1/images/router");
const refreshTokenRouter = require("./app/api/v1/refresh-tokens/router");
const usersRouter = require("./app/api/v1/users/router");
const authenticationRouter = require("./app/api/v1/authentications/router");
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

app.use(`${apiVersion}/cms/images`, imagesRouter);
app.use(`${apiVersion}/cms/refresh-tokens`, refreshTokenRouter);
app.use(`${apiVersion}/cms/users`, usersRouter);
app.use(`${apiVersion}/cms/authentications`, authenticationRouter);

app.use("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

app.use(notFound);
app.use(handleError);

module.exports = app;
