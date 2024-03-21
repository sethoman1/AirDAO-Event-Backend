import { Schema, model } from "mongoose";


const plansSchema = new Schema({
  price: {
    type: String,
  },
})

export default model('Plan', plansSchema)