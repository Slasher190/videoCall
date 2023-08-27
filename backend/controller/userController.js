import ErrorHandler from "../middleware/error.js";
import { User } from "../model/userModel.js";
import { Record } from "../model/recordModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User Already Exist", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(newUser, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Username or Password", 400));
    }
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const record = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const url  = req.body.url;
    const record_ = Record.create({
      user: userId,
      url,
    });
    res.status(200).json({
      success: true,
      record_,
    });
  } catch (error) {
    next(error);
  }
};
