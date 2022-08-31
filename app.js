const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./util/database');
const Users = require('./models/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
  extended: false
}));

let users;

app.get('/input', (req, res, next) => {
  return res.render('input', {
    pageTitle: "Input Users"
  });
});

app.post('/input', (req, res, next) => {
  const name = req.body.name;
  const password = 123;
  return Users.create({
      name: name,
      password: password
    })
    .then(result => {
      console.log(result);
      return res.redirect('/users');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/users', (req, res, next) => {
  Users.findAll()
  .then(users =>{
    return res.render('user', {
      pageTitle: "List Users",
      users: users
    });
  })
  .catch(err => {
    console.log(err);
  })
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


sequelize.sync()
  .then(results => {
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch(err => {
    console.log(err);
  });
