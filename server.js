const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const db = require("./models");
const router = require("./router");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Express Session
app.use(
  session({
    secret: "News Cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
  })
);

// Use morgan logger for logging requests
app.use(logger("dev"));

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/MAKE A DB", {
  useNewUrlParser: true
});

// Router
app.use("/", router);
