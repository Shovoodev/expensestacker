// @ts-nocheck
import { getUserByEmail, getsingleUserById, getUserById } from "./../db/user";
import {
  assigenUserOnGroup,
  getGroupById,
  updateGroupById,
} from "./../db/group";
import express from "express";
import nodemailer from "nodemailer";
import { authentication, random } from "./../helpers";
import {
  createMember,
  deleteUserFronGroupId,
  findDuplicatedUsers,
  getMembers,
  getAllMembers,
  getUsers,
  updateMemberByGroupId,
  getMembersByGroupId,
  getmembershipByInviteToken,
  getMemberByToken,
} from "./../db/membership";
import { Resend } from "resend";

const resend = new Resend("re_RNSeBKAn_6oWiyfp3GEoXv1C5DuCNnnT8");

export const assigneUserToGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId, userId } = req.params;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await getGroupById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const inviteToken = authentication(random(), random());
    if (group) {
      const newMember = await createMember({
        userId: user._id,
        groupId: groupId,
        isActive: true,
        inviteToken: inviteToken,
      });

      return res.status(200).json(newMember);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersByGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId } = req.params;
    const members = await getMembersByGroupId(groupId);

    if (!members) {
      return res
        .status(404)
        .json({ message: "No members found for the group." });
    }

    const users = await Promise.all(
      members.map(async (member) => {
        if (member.groupId === groupId) {
          return await getUserById(member.userId);
        }
      })
    );

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by group:", error);
    return res.status(400);
  }
};
export const deleteUserFronGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId, userId } = req.params;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log({ user });

    const group = await getGroupById(groupId);
    console.log({ group });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (group) {
      const allusers = user.users.map((id) => id.toString());
      console.log({ allusers });

      const deleteUser = await deleteUserFronGroupId(userId._id);
    }

    if (deleteUser) {
      return res.status(200).json(deleteUser);
    }
  } catch (error) {
    console.log(error);
  }
};

export const inviteNewUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { to, user } = req.body;
    const { groupId, userId } = req.params;

    const group = await getGroupById(groupId);
    console.log({ group });

    const getusers = await getMembers();
    const token;
    const inviter = getusers.map((id) => {
      if (id.userId == userId) {
        token = id.inviteToken;
        return token;
      } else return;
    });
    console.log({ token });

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: "re_RNSeBKAn_6oWiyfp3GEoXv1C5DuCNnnT8",
      },
    });
    const info = await transporter.sendMail({
      from: '"Toukir Shuvo" <expensly@toukir.cc>',
      to: `${to}`,
      subject: `Your friend ${user} send you requiest to join Expense Tracker `,
      text: "Expense tracker is a platform to manage your expenses with your friend more easily and smartly",
      html: `<h4>You are invited to join ${group.name}<h4><br/>
      <a href="http://localhost:5173/invite/register?token=${token}">Click to Join Group</a>
     `,
    });
    return res.status(200).json(info);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};

export const joinInvitedUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { token } = req.params;
    if (!userId) {
      return res.redirect(`/invite/register`);
    }
    // if (!email || !password || !username) {
    //   return res.status(400);
    // }
    // const existingUser = await getUserByEmail(email);

    // if (existingUser) {
    //   return res
    //     .status(400)
    //     .json({ message: "User is already exist , Please signUp" });
    // }
    // const salt = random();
    // const user = await createUser({
    //   email,
    //   username,
    //   authentication: {
    //     salt,
    //     password: authentication(salt, password),
    //   },
    // });

    const getuserToken = await getMemberByToken(token);

    if (!getuserToken || !getuserToken.inviteToken) {
      return res.status(404).json({ error: "Group or invite token not found" });
    }
    const invitoken = getuserToken.inviteToken.trim().toString();

    const group = await getGroupById(groupId);

    if (group) {
      const newMember = await createMember({
        userId: userId,
        groupId: groupId,
        isActive: true,
        inviteToken: token,
      });
      return res.status(200).json(newMember);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getGroupUsingInviteToken = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { token, groupId } = req.params;
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400);
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User is already exist , Please signUp" });
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    if (user) {
      const newMember = await createMember({
        userId: user._id,
        groupId: groupId,
        isActive: true,
        inviteToken: token,
      });

      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
