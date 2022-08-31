const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");
const URI =
  "mongodb+srv://trongnguyenhuy:jj6arv15@cluster0.qyzg5.mongodb.net/practices";
const User = require("./models/users");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

let users;

app.get("/input", (req, res, next) => {
  return res.render("input", {
    pageTitle: "Input Users",
  });
});

app.post("/input", (req, res, next) => {
  const name = req.body.name;
  const password = 123;
  const user = new User({
    name: name,
    password: password,
  });
  return user
    .save()
    .then((result) => {
      return res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/users", (req, res, next) => {
  User.find()
    .then((users) => {
      return res.render("user", {
        pageTitle: "List Users",
        users: users,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/users/:id", (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      return res.render("user-detail", {
        pageTitle: "List Users",
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

mongoose.connect(URI).then((results) => {
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
});
