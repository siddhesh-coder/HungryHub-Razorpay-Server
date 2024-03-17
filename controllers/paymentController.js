import { instance } from "../server.js";
import crypto from "crypto";
import { config } from "dotenv";

config({ path: "./config/config.env" });

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.finalAmount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const paymentIsAuthentic = expectedSignature === razorpay_signature;

  if (paymentIsAuthentic) {
    res.redirect(
      `${process.env.CLIENT_URL}/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: true,
    });
  }
};
