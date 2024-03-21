import { Schema, model } from "mongoose";


const eventsSchema = new Schema({

}, { timestamps: true })

export default model('Event', eventsSchema)