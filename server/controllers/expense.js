const Expense = require("../models/expense");
const User = require("../models/user");

exports.getExpenses = async (req, res, next) => {
  const userId = req.user.dataValues.id;
  try {
    const result = await Expense.findAll({ where: { userId: userId } });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

exports.postAddExpense = async (req, res, next) => {
  const expenseData = req.body;
  try {
    const result = await Expense.create({
      ...expenseData,
      userId: req.user.id,
    });
    req.user.totalExpense = req.user.totalExpense + +expenseData.amount;
    await req.user.save();
    return res.status(201).json(result.dataValues);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  try {
    const item = await Expense.findOne({
      where: { id: id, userId: req.user.id },
    });
    const amount = item.dataValues.amount;
    await item.destroy();
    req.user.totalExpense = req.user.totalExpense - +amount;
    await req.user.save();
    return res.status(200).json("Deleted successfully");
  } catch (err) {
    console.log(err);
  }
};
