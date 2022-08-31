const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const database = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
  extended: false
}));

let users;

database.execute("SELECT * FROM users")
  .then(result => {
    users = result[0];
  });

app.get('/input', (req, res, next) => {
  return res.render('input', {
    pageTitle: "Input Users"
  });
});

app.post('/input', (req, res, next) => {
  const name = req.body.name;
  const password = 123;
  database.execute("INSERT INTO users (name, password)" + "VALUES(?,?)", [name, password])
  .then(result => {
    console.log(result);
    return res.redirect("/users");
  });
});

app.get('/users', (req, res, next) => {
  return res.render('user', {
    pageTitle: "List Users",
    users: users
  });
});

app.get('/users/:id', (req, res, next) => {
  const id = req.params.id;
  return res.render('user-detail', {
    pageTitle: "List Users",
    user: users[id]
  });
});

app.get("/", (req, res, next) => {

  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
