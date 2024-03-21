import { Schema, model } from "mongoose";


const speakersSchema = new Schema({

}, { timestamps: true })

export default model('Speaker', speakersSchema)