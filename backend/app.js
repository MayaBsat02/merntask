const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const adminRoutes = require("./routes/admin");
const menuRoutes = require("./routes/menu");
const bodyParser = require("body-parser");
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  //set always content type to application json
  res.setHeader("Content-Type", "application/json");
  next();
});


//routes
app.use(bodyParser.json());
app.use("/admin", adminRoutes);
app.use("/menu", menuRoutes);

const port = process.env.PORT || 3000;
//Connect to MongoDb
mongoose
  .connect(
    "mongodb+srv://MayaBsat:sU2sC3Dt36n35f-@menuappdb.fpv2khx.mongodb.net/menu"
  )
  .then(() => {
    app.listen(port);
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
