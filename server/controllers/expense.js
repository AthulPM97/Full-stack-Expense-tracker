const Expense = require("../models/expense");

exports.getExpenses = async (req, res, next) => {
  try {
    const result = await Expense.findAll();
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

exports.postAddExpense = async (req, res, next) => {
  const expenseData = req.body;
  try {
    const result = await Expense.create({ ...expenseData });
    return res.status(201).json(result.dataValues);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    try{
        const item = await Expense.findByPk(id);
        await item.destroy();
        return res.status(200).json("Deleted successfully");
    }catch(err) {
        console.log(err);
    }
}
