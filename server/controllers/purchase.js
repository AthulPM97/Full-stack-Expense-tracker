const Razorpay = require("razorpay");
const Order = require("../models/order");

exports.buyPremium = async (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "something went wrong", error: err });
  }
};

exports.updateTransactionStatus = async (req, res, next) => {
  try {
    const { payment_id, order_id } = req.body;
    const [order, user] = await Promise.all([
      Order.findOne({ where: { orderid: order_id } }),
      req.user.update({ isPremium: true })
    ]);
    await order.update({ paymentid: payment_id, status: "SUCCESSFUL" });
    return res
      .status(202)
      .json({ success: true, message: "Transactions successful" });
  } catch (err) {
    console.log(err);
  }
};
