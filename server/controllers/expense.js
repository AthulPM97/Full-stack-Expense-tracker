const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

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
  const t = await sequelize.transaction();
  const expenseData = req.body;
  try {
    const result = await Expense.create(
      {
        ...expenseData,
        userId: req.user.id,
      },
      { transaction: t }
    );
    await t.commit();
    req.user.totalExpense = req.user.totalExpense + +expenseData.amount;
    await req.user.save();
    return res.status(201).json(result.dataValues);
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  const t = await sequelize.transaction();
  try {
    const item = await Expense.findOne(
      {
        where: { id: id, userId: req.user.id },
      },
      { transaction: t }
    );
    const amount = item.dataValues.amount;
    await item.destroy();
    await t.commit();
    req.user.totalExpense = req.user.totalExpense - +amount;
    await req.user.save();
    return res.status(200).json("Deleted successfully");
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};
