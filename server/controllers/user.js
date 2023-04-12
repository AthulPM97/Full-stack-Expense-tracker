const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");

function generateAccessToken(id) {
  return jwt.sign({ id: id }, process.env.SECRET_KEY);
}

async function uploadToS3 (data, filename) {
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  });

  var params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  try {
    const response = await s3bucket.upload(params).promise();
    console.log("success", response);
    return response.Location;
  } catch (err) {
    console.log("something went wrong", err);
    throw err;
  }
}


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
      bcrypt.hash(userDetails.password, 10, async (err, hash) => {
        const user = await User.create({
          ...userDetails,
          password: hash,
          isPremium: false,
        });
        return res.status(201).json({
          message: "User created successfully",
          token: generateAccessToken(user.id),
        });
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
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Password does not match!" });
        }
        if (result) {
          return res.status(200).json({
            message: "Successfully logged in",
            token: generateAccessToken(user.id),
            isPremium: user.isPremium,
          });
        } else {
          return res.status(404).json({ message: "User does not exist!" });
        }
      });
    }
  } catch (err) {
    console.log("postUserLogin ", err);
  }
};

exports.getDownloadExpenses = async (req, res) => {
  try {
    const expenses = await req.user.getExpenses();
    const stringifiedExpenses = JSON.stringify(expenses);
    const filename = `${new Date()}.txt`;
    const fileUrl = await uploadToS3(stringifiedExpenses, filename);
    console.log(fileUrl);
    res.status(200).json({ fileUrl, success: true });
  } catch (err) {
    console.log(err);
  }
};
