require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes
const userRoutes = require("./server/routes/user");
const sequelize = require("./server/util/database");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/user", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
