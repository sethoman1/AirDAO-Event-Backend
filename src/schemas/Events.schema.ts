import { Schema, model } from "mongoose";

const speakerRequestsSchema = new Schema({
  speakerId: {
    type: Schema.Types.ObjectId,
    ref: 'Speaker',
    required: true
  },
  presentationTopic: {
    type: String,
    required: true
  },
  presentationAbstract: {
    type: String,
    required: true
  },
  additionalComments: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', "rejected"],
    required: true
  }

}, { _id: false })

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
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  speakers: {
    type: [speakerRequestsSchema],
    ref: 'Speaker'
  },

}, { timestamps: true })

export default model('Event', eventsSchema)