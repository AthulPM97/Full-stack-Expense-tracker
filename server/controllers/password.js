const emailService = require("../util/send-mail");

exports.postForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    await emailService.sendMail(
      email,
      "reset password",
      "Click here for password reset"
    );
    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error sending mail");
  }
};
