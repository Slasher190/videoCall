import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      requird: [true, "Please Enter Your Name"],
      maxLength: [30, "Name Cannot Be More Than 30 Character"],
      minLength: [4, "name Cannot Be Less Than 4 Character"],
    },
    email: {
      type: String,
      requird: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter A Valid Email"]
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  });
  export const User = mongoose.model("User", userSchema);
  
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });