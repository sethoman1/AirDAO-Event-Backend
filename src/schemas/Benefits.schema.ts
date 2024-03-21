import { Schema, model } from "mongoose";


const benefitsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

export default model('Benefit', benefitsSchema)