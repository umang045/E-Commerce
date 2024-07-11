const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_rsW4Snw7J4ty0R",
  key_secret: "umang",
});

const checkout = async (req, res) => {
  const option = {
    amount: 50000,
    currency: "INR",
  };
  const order = await instance.orders.create(option);
  res.json({
    sucess: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
};

module.exports = {
  checkout,
  paymentVerification,
};
