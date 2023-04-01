const { Sequelize } = require("sequelize");
const Expense = require("../models/expense");
const User = require("../models/user");

exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaders = await User.findAll({
      attributes: ["id", "name", "totalExpense"],
      order: [["totalExpense", "DESC"]],
    });
    return res.status(200).json(leaders);
  } catch (err) {
    console.log(err);
  }
};
