const { Sequelize } = require("sequelize");
const Expense = require("../models/expense");
const User = require("../models/user");

exports.getLeaderboard = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({
      attributes: [
        "userId",
        [Sequelize.col("user.name"), "name"],
        [Sequelize.fn("sum", Sequelize.col("amount")), "totalAmount"],
      ],
      group: ["userId"],
      include: {
        model: User,
        attributes: [],
      },
      order: [['totalAmount', 'DESC']]
    });
    return res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
  }
};
