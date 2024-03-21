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
  slugName: {
    type: String,
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
  plans : {
    
  }
}, { timestamps: true })

export default model('Event', eventsSchema)