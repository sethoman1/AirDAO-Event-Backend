import { Schema, model } from "mongoose";

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
  }
})

export default model('User', usersSchema)