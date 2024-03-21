import { Schema, model } from "mongoose";

const handleSchema = new Schema({
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
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  orgName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  handles: [handleSchema],
  status: {
    type: String,
    default: 'pending'
  }

}, { timestamps: true })

export default model('Speaker', speakersSchema)