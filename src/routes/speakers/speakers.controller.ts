import { Request, Response } from "express";
import { config } from 'dotenv'
config()
import jwt from 'jsonwebtoken'
import Speakers from "../../schemas/Speakers.schema";

import customErrorHandler from "../../utils/customErrorHandler";
import { newSpeakerDataValidator, editSpeakerDataValidator, moderateSpeakerDataValidator } from "../../libs/joi";
import generateKey from "../../utils/generateKey";

// Register as a speaker
export const registerAsASpeaker = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = newSpeakerDataValidator.validate(req.body)
  const image = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fa.storyblok.com%2Ff%2F191576%2F1200x800%2F215e59568f%2Fround_profil_picture_after_.webp&tbnid=0Dcuta4WXRYMgM&vet=12ahUKEwjSncT8wYaFAxX9AvsDHZ__Bq8QMygKegUIARCFAQ..i&imgrefurl=https%3A%2F%2Fwww.photoroom.com%2Ftools%2Fround-profile-picture&docid=IjCqey4zpl0BJM&w=1200&h=800&q=profile&ved=2ahUKEwjSncT8wYaFAxX9AvsDHZ__Bq8QMygKegUIARCFAQ'

  if (error) {
    res.status(400)
    throw new Error(error?.details[0]?.message)
  }
  // Speaker should always have a unique email
  // Get speaker
  const speaker = await Speakers.findOne({ email: value?.email })
  if (speaker) {
    res.status(404)
    throw new Error('A speaker exists with the same email. Please consider editing the email address')
  }

  // generate id
  const id = generateKey(8)

  // Send the admin an email that a new speaker registered

  // Send speaker an email to inform them that the request was received
  await Speakers.create({ ...value, photo: image, id })
  res.status(200).json({ success: true, message: 'Your request to be a speaker in AirDAO was successful and is pending approval...' })
})

// List All Pending Speaker Requests
export const listAllPendingSpeakers = customErrorHandler(async (req: Request, res: Response) => {
  const pending = await Speakers.find({ status: 'pending' })
  res.status(200).json({ result: pending, count: pending?.length })
})

// Edit Details
// User must first receive a token that they can use for the edit. 
// Editing details, resets the status of a user to pending
export const getEditValidationToken = customErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const speaker = await Speakers.find({ id: id.toUpperCase() })

  if (!speaker) {
    res.status(404)
    throw new Error('The provided speaker does not exist')
  }

  // Generate code 
  const code = generateKey(16)

  // Send email
  const token = jwt.sign({ code, id }, process.env.JWT_KEY as string, { expiresIn: '2h' })
  console.log(token)

  // Update user
  await Speakers.updateOne({ id }, { $set: { code } })
  res.status(200).json({ success: true, message: 'Valdation token successfully sent to your email...' })
})


export const editASpeaker = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = editSpeakerDataValidator.validate(req.body)
  const { id } = req.params

  if (error) {
    res.status(400)
    throw new Error(error?.details[0]?.message)
  }

  // Validate jwt
  const token: any = await jwt.verify(value?.token, process.env.JWT_KEY as string)
  if (!token.code || !token.id) {
    res.status(400)
    throw new Error('The provided token is invalid')
  }

  // Get speaker
  const speaker = await Speakers.findOne({ id })
  if (!speaker) {
    res.status(404)
    throw new Error('The provided speaker doesn\'t exist')
  }


  // Email to admin to verify and confirm that an exisiting speaker has changed their details(If there were initially verified)
  if (speaker?.status !== 'pending') {

  }
  // Update user
  await Speakers.updateOne({}, { $set: { ...value, status: 'pending' } })

  res.status(200).json({ success: true, message: 'The speaker was successfully updated' })
})

// Verify speaker details and account
export const moderateSpeakerRequest = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = moderateSpeakerDataValidator.validate(req.body)
  const { id } = req.params
  if (error) {
    res.status(400)
    throw new Error(error?.details[0]?.message)
  }
  // Find speaker
  const speaker = await Speakers.findOne({ id })
  if (!speaker) {
    res.status(404)
    throw new Error('The provided speaker doesn\'t exist')
  }

  // Update speaker
  await Speakers.updateOne({ id }, { $set: { status: value?.moderation, rejectReason: value?.rejectReason } })

  res.status(200).json({ success: true, message: 'Speaker has been successfully moderated accordingly' })
})

// Delete speaker

// Retrieve speaker's code
export const getASpeakerById = customErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  // Find speaker
  const speaker = await Speakers.findOne({ id }, { __v: 0, code: 0 })
  if (!speaker) {
    res.status(404)
    throw new Error('The provided speaker doesn\'t exist')
  }

  res.status(200).json({ success: true, result: speaker })
})