import mongoose from "mongoose";

const memberShipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
  inviteToken: { type: String, required: true },
  isActive: { type: String, required: true, default: false },
  created_at: { type: Date, default: Date.now },
});
const memberModel = mongoose.model("MEMBERSHIP", memberShipSchema);
export const getMembers = () => memberModel.find();
export const getMembersByGroupId = (groupId: string) =>
  memberModel.find({ groupId });
export const getMembersByUserId = (userId: string) =>
  memberModel.find({ userId });
export const getMemberByToken = (inviteToken: string) =>
  memberModel.findOne({ inviteToken });
export const getAllMembers = (groupId: string) => memberModel.find({ groupId });
export const getmembershipByInviteToken = (inviteToken: string) =>
  memberModel.findOne({ inviteToken });
export const createMember = (values: Record<string, any>) =>
  new memberModel(values).save().then((member) => member.toObject());
export const updateMemberByGroupId = (
  memberId: string,
  values: Record<string, any>
) => {
  return memberModel.findOneAndUpdate(
    { _id: memberId },
    { ...values },
    { new: true }
  );
};
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
