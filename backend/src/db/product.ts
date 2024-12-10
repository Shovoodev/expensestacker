import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  expense_id: { type: Number },
  group_id: { type: String },
  created_at: { type: Date, default: Date.now },
});
export const productModel = mongoose.model("Product", productSchema);
export const getProducts = () => productModel.find();
export const getProductByGroupId = (group_id: string) =>
  productModel.find({ group_id });
export const getProductById = (id: string) => productModel.findById(id).exec();
export const createProduct = (values: Record<string, any>) =>
  new productModel(values).save().then((product) => product.toObject());
export const deleteProductById = (id: string) =>
  productModel.findByIdAndDelete({ _id: id });
export const updateProductById = (id: string, values: Record<string, any>) =>
  productModel.findByIdAndUpdate(id, values);
