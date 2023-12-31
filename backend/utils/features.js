import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: process.env.COOKIE_EXPIRE * 60 * 60 * 1000,
        // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        // secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message,
        token,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};
