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
  },
  slots: {
    type: Number,
    required: true
  },
  availableSlots: {
    type: Number
  }
})

export default model('Plan', plansSchema)