import mongoose from "mongoose";

const memberShipSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  groupId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    required: true,
    default: "member",
  },
  isActive: { type: String, required: true, default: false },
  created_at: { type: Date, default: Date.now },
});
const memberModel = mongoose.model("MEMBERSHIP", memberShipSchema);

export const getUsers = (group_Id: any) => memberModel.find(group_Id);

export const createMember = (values: Record<string, any>) =>
  new memberModel(values).save().then((member) => member.toObject());
