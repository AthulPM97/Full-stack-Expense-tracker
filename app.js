require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes
const userRoutes = require("./server/routes/user");
const expenseRoutes = require('./server/routes/expense');

const sequelize = require("./server/util/database");
const User = require("./server/models/user");
const Expense = require("./server/models/expense");

const authenticateUser = require("./server/middlewares/authenticate");

const app = express();

//middleware stack
app.use(cors());

app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use('/expense', authenticateUser, expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  // .sync({force: true})
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
