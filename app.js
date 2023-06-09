const fs = require("fs");
const path = require("path");

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

//routes
const userRoutes = require("./server/routes/user");
const expenseRoutes = require("./server/routes/expense");
const purchaseRoutes = require("./server/routes/purchase");
const premiumRoutes = require("./server/routes/premium");
const passwordRoutes = require("./server/routes/password");

//models
const sequelize = require("./server/util/database");
const User = require("./server/models/user");
const Expense = require("./server/models/expense");
const authenticateUser = require("./server/middlewares/authenticate");
const Order = require("./server/models/order");
const ForgotPassword = require("./server/models/forgotPassword");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

//middleware stack
app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use("/expense", authenticateUser, expenseRoutes);

app.use("/purchase", authenticateUser, purchaseRoutes);

app.use("/premium", premiumRoutes);

app.use("/password", passwordRoutes);

//user-expense association
User.hasMany(Expense);
Expense.belongsTo(User);

//user-order association
User.hasMany(Order);
Order.belongsTo(User);

//user-forgotpassword association
User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

sequelize
  // .sync({force: true})
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
