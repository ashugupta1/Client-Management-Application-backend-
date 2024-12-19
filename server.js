const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/userRoute");
const cors = require("cors");
const clientRoute = require('./routes/clientRoute')

const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;

connectDB();


app.use("/api/", authRoutes);
app.use("/api/", clientRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
