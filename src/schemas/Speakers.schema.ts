import { Schema, model } from "mongoose";
export const handleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
}, { _id: false })

const speakersSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  orgName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  photo: {
    type: String,
  },
  rejectReason: {
    type: String
  },
  handles: [handleSchema],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  // This code will be used for verifying the user and allowing them to edit their account
  code: {
    type: String
  }

}, { timestamps: true })

export default model('Speaker', speakersSchema)