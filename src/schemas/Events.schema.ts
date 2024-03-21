import { Schema, model } from "mongoose";


const eventsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  edition: {
    type: String,
  },
  slugname: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  speakers: {
    type: [Schema.Types.ObjectId],
    ref: 'Speaker'
  },

}, { timestamps: true })

export default model('Event', eventsSchema)