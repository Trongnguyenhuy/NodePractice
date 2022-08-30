const express = require('express');
const path = require('path');

const app = express();

app.use("/", (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
