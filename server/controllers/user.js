const User = require("../models/user");

exports.postUserSignup = (req, res, next) => {
  const userDetails = req.body;
  const userEmail = userDetails.email;
  User.findAll({ where: { email: userEmail } })
    .then((user) => {
      if (user.length) {
        return res.status(403).json({ message: "user already exists" });
      }
      return User.create({ ...userDetails });
    })
    .then((user) => res.status(200).json('Sign up successful'))
    .catch((err) => console.log(err));
};
