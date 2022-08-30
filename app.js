const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
  extended: false
}));

const users = ["An", "Binh", "Cuong"];

app.get('/input', (req, res, next) => {
  return res.render('input',{
    pageTitle: "Input Users"
  });
});

app.post('/input', (req, res, next) => {
  const name = req.body.name;
  users.push(name);
  return res.redirect('/users');
});

app.get('/users', (req, res, next) => {
  return res.render('user',{
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
