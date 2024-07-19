import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    paymentIntentId: { type: String },
    products: [
      {
        _id: {
          type: String,
        },
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        price: {
          type: String,
        },
        image: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
