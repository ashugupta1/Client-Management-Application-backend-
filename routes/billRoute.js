const express = require("express");
const app = express.Router();

const random = Math.floor(1000 + Math.random() * 1000);
console.log(random);

app.post("/bills", (req, res) => {

});

app.get("/bills", (req, res) => {
  res.send(`${random}`);
  
});

app.put("/bills/:id", (req, res) => {});

app.delete("/bills/:id", (req, res) => {});

module.exports = app