import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  barcode: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = mongoose.model("OrderItem", OrderSchema);

export const orderProduct = (values: Record<string, any>) => {
  new OrderModel(values).save().then((order) => order.toObject());
};
