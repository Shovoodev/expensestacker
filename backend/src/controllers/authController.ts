import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../db/user";
import { authentication, random } from "../helpers";

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ error: "email or password is wrong" });
    }
    console.log(email);
    console.log(password);

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    console.log({ user });

    if (!user) {
      return res.status(403).json({ error: "User is not registered" });
    }
    const expectdHash = authentication(user.authentication.salt, password);
    console.log(user);

    console.log({ expectdHash });

    if (user.authentication.password !== expectdHash) {
      return res.status(403).json({ error: "email or password is wrong" });
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("VIDEO", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      sameSite: "lax", // Adjust as needed; "lax" works for most cases
    });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {

    console.error(error);
    res.status(400);
  }
};

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400);
    }
    const existingUser = await getUserByEmail(email);
    console.log(existingUser);

    if (existingUser) {
      return res.status(400);
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
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
export const logOut = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {

  
    res.clearCookie("VIDEO", {
      domain: "localhost",
      path: "/",
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred during logout" });
  }
}