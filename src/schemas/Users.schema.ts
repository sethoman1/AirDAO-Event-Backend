import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

// This is just for the admin and others
const usersSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String
  },
})

usersSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

usersSchema.methods.updatePassword = async function (password: string) {
  try {
    this.password = password
    this.code = ''
  } catch (error) {
    throw error;
  }
};

usersSchema.pre("save", async function (next) {
  // Only hash the password if it's new or modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password as string, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    return next(error);
  }
});



export default model('User', usersSchema)