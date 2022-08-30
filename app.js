const express = require('express');

const app = express();

app.use("/", (req,res,next) => {
  res.send("<h1>Hello world from new server!</h1>")
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
