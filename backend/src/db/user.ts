import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const userModel = mongoose.model("User", userSchema);
export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getsingleUserById = (userId: string) => userModel.findById(userId);
export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  userModel.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values);

export const findMultipleUserById = (ids: string[]) =>
  userModel.find().where("_id").in(ids).exec();
