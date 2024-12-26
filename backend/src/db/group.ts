import mongoose from "mongoose";
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  owner_id: { type: String },
  created_at: { type: Date, default: Date.now },
});
export const groupModel = mongoose.model("GROUPS", groupSchema);
export const getOwner = (owner_id: string) => groupModel.findOne({ owner_id });
export const getGroups = (userId: string) =>
  groupModel.find({ owner_id: userId });
export const getGroupById = (groupId: string) => groupModel.findById(groupId);
export const createGroup = (values: Record<string, any>) =>
  new groupModel(values).save().then((user) => user.toObject());
export const assigenUserOnGroup = (values: Record<string, any>) =>
  new groupModel(values).save().then((user) => user.toObject());
export const deleteGroupById = (id: string) =>
  groupModel.findByIdAndDelete({ _id: id });
export const updateGroupById = (id: string, values: Record<string, any>) =>
  groupModel.findByIdAndUpdate(id, values);
