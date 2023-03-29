const Expense = require("../models/expense");
const User = require("../models/user");

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
  console.log(req.user)
  try {
    const result = await Expense.create({ ...expenseData, userId: req.user.id });
    return res.status(201).json(result.dataValues);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    try{
        const item = await Expense.findOne({where: {id: id, userId: req.user.id}});
        await item.destroy();
        return res.status(200).json("Deleted successfully");
    }catch(err) {
        console.log(err);
    }
}
