import { RequestHandler } from "express";
import getErrorMessage from "../utils/getErrorMessage";
import User from "../models/User";

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndDelete({ username });

    res.status(200).json({ message: `Successfully deleted user with username ${user?.username}` });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};
