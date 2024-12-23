import mongoose from "mongoose";

const memberShipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    required: true,
    default: "member",
  },
  acessTokem: { type: String },
  isActive: { type: String, required: true, default: false },
  created_at: { type: Date, default: Date.now },
});
const memberModel = mongoose.model("MEMBERSHIP", memberShipSchema);
export const getMembers = () => memberModel.find();
export const getAllMembers = (groupId: string) => memberModel.find({ groupId });
export const createMember = (values: Record<string, any>) =>
  new memberModel(values).save().then((member) => member.toObject());
export const updateMemberByGroupId = (
  groupId: string,
  values: Record<string, any>
) => memberModel.findByIdAndUpdate(groupId, values);
export const deleteUserFronGroupId = (userId: string) =>
  memberModel.findByIdAndDelete({ _id: userId });
export const findDuplicatedUsers = async () => {
  try {
    const result = await memberModel.aggregate([
      {
        $group: {
          _id: "$userId", // Group by userId
          groups: { $push: "$_id" }, // Collect membership _ids
        },
      },
      {
        $match: {
          _id: { $ne: null }, // Filter out invalid userIds
        },
      },
    ]);
    return result;
  } catch (error) {
    console.error("Error finding duplicate users:", error);
  }
};
