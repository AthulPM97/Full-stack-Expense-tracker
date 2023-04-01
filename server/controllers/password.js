const path = require("path");

const ForgotPassword = require("../models/forgotPassword");
const User = require("../models/user");
const sequelize = require("../util/database");
const emailService = require("../util/send-mail");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

exports.postForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const t = await sequelize.transaction();
  try {
    const user = await User.findOne({ where: { email: email } });
    const userId = user.dataValues.id;
    const generatedUid = uuid();
    await ForgotPassword.create(
      {
        uuid: generatedUid,
        userId: userId,
      },
      { transaction: t }
    );
    await t.commit();
    await emailService.sendMail(
      email,
      "Reset password link",
      `http://localhost:3000/password/reset-password/${generatedUid}`
    );
    res
      .status(200)
      .send(`http://localhost:3000/password/reset-password/${generatedUid}`);
  } catch (err) {
    console.log(err);
    await t.rollback();
    res.status(500).send("Error sending mail");
  }
};

exports.getResetPassword = async (req, res) => {
  const id = req.params.id;
  try {
    const existingRequest = await ForgotPassword.findOne({
      where: { uuid: id },
    });
    if (existingRequest && existingRequest.dataValues.isActive) {
      //return form
      res.sendFile(
        path.join(__dirname, "..", "/views", "/reset-password.html")
      );
    } else {
      return res.status(404).send("Could not validate request");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.postUpdatePassword = async (req, res) => {
  const { password, uuid } = req.body;
  console.log(req.body.password);
  try {
    const resetRequest = await ForgotPassword.findOne({
      where: { uuid: uuid },
    });
    const userId = resetRequest.dataValues.userId;
    resetRequest.isActive = false;
    await resetRequest.save();
    bcrypt.hash(password, 10, async (err, hash) => {
      const user = await User.findOne({ where: { id: userId } });
      user.password = hash;
      await user.save();
      return res.status(200).send("Password updated successfully");
    });
  } catch (err) {
    console.log(err);
  }
};
