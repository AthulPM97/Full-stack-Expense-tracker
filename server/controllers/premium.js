const User = require("../models/user");

exports.getLeaderboard = async (req, res, next) => {
  try {
    if (req.user.isPremium) {
      const leaders = await User.findAll({
        attributes: ["id", "name", "totalExpense"],
        order: [["totalExpense", "DESC"]],
      });
      return res.status(200).json(leaders);
    } else {
      res.status(500).json({ success: false, message: "Not a premium user!" });
    }
  } catch (err) {
    console.log(err);
  }
};
