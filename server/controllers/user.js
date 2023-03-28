const User = require("../models/user");

exports.postUserSignup = async (req, res, next) => {
  const userDetails = req.body;
  const userEmail = userDetails.email;
  try {
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    if (user) {
      return res.status(500).json({
        message: "Email already exists",
      });
    } else {
      await User.create({ ...userDetails });

      return res.status(200).json({
        message: "User created successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.postUserLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      if (user.password === password) {
        return res.status(200).json({ message: "Successfully logged in" });
      } else {
        return res.status(500).json({ message: "Wrong password" });
      }
    } else {
      return res.status(500).json({ message: "User does not exist!" });
    }
  } catch (err) {
    console.log("postUserLogin ", err);
  }
};
