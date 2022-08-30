const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
  extended: false
}));

const users = ["An", "Binh", "Cuong"];

app.get('/users', (req, res, next) => {
  return res.render('user',{
    pageTitle: "List Users",
    users: users
  });
});

app.get("/", (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
