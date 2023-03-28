require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes
const userRoutes = require("./server/routes/user");
const expenseRoutes = require('./server/routes/expense');
const sequelize = require("./server/util/database");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use('/expense', expenseRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
