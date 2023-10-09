import mongoose from "mongoose";

const ProductSchme = new mongoose.Schema({
  name: { type: String, required: true },
  barcode: { type: Number, required: true },
});
