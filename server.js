import { app } from "./app.js";
import Razorpay from 'razorpay';
const PORT = process.env.PORT || 7000;

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`);
});
