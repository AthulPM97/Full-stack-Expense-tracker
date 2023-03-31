const { Sequelize } = require("sequelize");
const Expense = require("../models/expense");
const User = require("../models/user");

exports.getLeaderboard = (req, res, next) => {
  Expense.findAll({
    attributes: ["userId", "amount", [Sequelize.col("user.name"), "name"]],
    include: {
      model: User,
      attributes: [],
    },
  })
    .then((result) => {
      const expenses = result;
      const userAmounts = {};

      expenses.forEach((expense) => {
        const name = expense.dataValues.name;
        const amount = expense.dataValues.amount;

        if (userAmounts[name]) {
          userAmounts[name] += amount;
        } else {
          userAmounts[name] = amount;
        }
      });
      const totalExpenses = Object.keys(userAmounts)
        .map((name, index) => ({
          id: index + 1,
          name: name,
          totalAmount: userAmounts[name],
        }))
        .sort((a, b) => b.totalAmount - a.totalAmount);
      
      res.status(200).json(totalExpenses);
    })
    .catch((err) => console.log(err));
};
