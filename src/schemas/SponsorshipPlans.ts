import { Schema, model } from "mongoose";

const plansSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  benefits: {
    type: [Schema.Types.ObjectId],
    ref: 'Benefit'
  }
})

export default model('Plan', plansSchema)