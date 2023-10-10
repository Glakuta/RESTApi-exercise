import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  barcode: { type: Number, required: true },
});

export const ProductModel = mongoose.model("Products", ProductSchema);

export const getProducts = () => ProductModel.find();
export const getProductsByName = (name: string) =>
  ProductModel.findOne({ name });
export const createProduct = (values: Record<string, any>) =>
  new ProductModel(values).save().then((product) => product.toObject());
