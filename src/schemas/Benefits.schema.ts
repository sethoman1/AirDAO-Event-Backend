import { Schema, model } from "mongoose";


const benefitsSchema = new Schema({
  benefit: {
    type: String,
  },
})

export default model('Benefit', benefitsSchema)