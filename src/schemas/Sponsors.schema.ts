import { Schema, model } from "mongoose";


const sponsorsSchema = new Schema({

}, { timestamps: true })

export default model('Sponsor', sponsorsSchema)