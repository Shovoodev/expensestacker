import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner_id: { type: String, permissionStatus: false },
  users: { type: Array },
  created_at: { type: Date, default: Date.now },
});
export const groupModel = mongoose.model("GROUPS", groupSchema);
export const getOwner = (owner_id: string) => groupModel.findOne({ owner_id });
export const getGroups = () => groupModel.find();
export const getGroupById = (id: string) => groupModel.findById(id).exec();
export const createGroup = (values: Record<string, any>) =>
  new groupModel(values).save().then((user) => user.toObject());
export const deleteGroupById = (id: string) =>
  groupModel.findByIdAndDelete({ _id: id });
export const updateGroupById = (id: string, values: Record<string, any>) =>
  groupModel.findByIdAndUpdate(id, values);
