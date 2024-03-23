import { Schema, model } from "mongoose";
import { handleSchema } from "./Speakers.schema";

const sponsorsSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: String
  },
  handles: {
    type: [handleSchema]
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  planId: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  proofUrl: {
    type: String
  },
  paymentVerified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

export default model('Sponsor', sponsorsSchema)