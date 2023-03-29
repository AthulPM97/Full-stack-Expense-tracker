const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  //gives us an object: { id: 1, iat: 1680072289 }
  const user = jwt.verify(token, process.env.SECRET_KEY);
  
  try {
    User.findByPk(user.id)
      .then((user) => {
        // console.log(user.dataValues);
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    return res.status(401).json("Could not verify user");
  }
};

module.exports = authenticateUser;
