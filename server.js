const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/userRoute");
const cors = require("cors");
const clientRoute = require("./routes/clientRoute");
const projectRoutes = require("./routes/projectRoute");
const billRoute = require('./routes/billRoute')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

connectDB();

app.use("/api/", authRoutes);
app.use("/api/", clientRoute);
app.use("/api/", projectRoutes);

const random = Math.floor(1000 + Math.random() * 1000);
console.log(random);

app.get("/", (req, res) => {
  res.send(`${random}`);
});

app.use("/api/", billRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
