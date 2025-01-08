import mongoose from "mongoose";

const detailUserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, required: true, default: "" },
  phone: { type: Number, required: true, default: 12 - 456 - 6789 },
  address: { type: String, required: true, default: "" },
});

export const userModel = mongoose.model("Detailuser", detailUserSchema);
export const getUserDetail = () => userModel.find();
export const getUserByUserEmail = (email: string) =>
  userModel.findOne({ email });
export const getUserByUserId = (_id: string) => userModel.findById({ _id });
export const createUserDetail = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());
export const deleteUserByUserId = (id: string) =>
  userModel.findByIdAndDelete({ _id: id });
export const updateUserDetailsByUserId = (
  id: string,
  values: Record<string, any>
) => userModel.findByIdAndUpdate(id, values);
