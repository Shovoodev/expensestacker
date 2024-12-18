// @ts-nocheck
import mongoose from "mongoose";
import { values } from "lodash";
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  owner_id: { type: String },
  users: [{ type: mongoose.Schema.Types.ObjectId }],
  created_at: { type: Date, default: Date.now },
});
export const groupModel = mongoose.model("GROUPS", groupSchema);
export const getOwner = (owner_id: string) => groupModel.findOne({ owner_id });
export const getGroups = (userId: string) =>
  groupModel.find({ owner_id: userId });
export const getGroupById = (groups_id: any) => groupModel.findById(groups_id);
export const createGroup = (values: Record<string, any>) =>
  new groupModel(values).save().then((user) => user.toObject());
export const assigenUserOnGroup = (values: Record<string, any>) =>
  new groupModel(values).save().then((user) => user.toObject());
export const deleteGroupById = (id: string) =>
  groupModel.findByIdAndDelete({ _id: id });
export const updateGroupById = (id: string, values: Record<string, any>) =>
  groupModel.findByIdAndUpdate(id, values);

