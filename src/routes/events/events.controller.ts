import { Request, Response } from "express";
import Plans from '../../schemas/SponsorshipPlans'
import Events from "../../schemas/Events.schema";

import { newPlanDataValidator, newEventDataValidator, registerAsASpeakerForAnEventDataValidator } from "../../libs/joi";
import customErrorHandler from "../../utils/customErrorHandler";
import createSlugname from "../../utils/createSlugname";
import Speakers from "../../schemas/Speakers.schema";

//  Create a new event
export const createNewEvent = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = newEventDataValidator.validate(req.body);

  if (error) {
    res.status(400);
    throw new Error(error?.details[0]?.message)
  }

  // Create slugname
  const slugname = createSlugname(value?.name)

  // Check if there is a pending events
  const pending = await Events.findOne({ status: 'pending' })
  if (pending) {
    throw new Error("There is a pending event, please mark as completed before creating a new event.")
  }

  // Create event 
  let event = await Events.create({ ...value, status: 'pending', speakers: [], slugname })

  res.status(200).json({ success: true, message: 'Event was successfully created', _id: event._id, slugname })
})

// Get all events
export const getAllEvents = customErrorHandler(async (req: Request, res: Response) => {
  const events = await Events.find({}, { __v: 0, updatedAt: 0 })
  res.status(200).json({ count: events?.length, results: events })
})

// Edit an event
export const editAnEvent = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = newEventDataValidator.validate(req.body);
  const { slugname } = req.params

  // Check data validation
  if (error) {
    res.status(400);
    throw new Error(error?.details[0]?.message)
  }

  // Check if event exists with the slugname
  const exists = await Events.findOne({ slugname: (slugname as string).toLowerCase() });
  if (!exists) {
    res.status(400)
    throw new Error("The provided event doesn't exist");
  }
  // User can only edit pending events
  if (exists.status !== 'pending') {
    res.status(400)
    throw new Error("The provided event doesn't exist");
  }
  // Create event 
  let event = await Events.updateOne({}, { $set: { ...value } })

  res.status(200).json({ success: true, message: 'Event was successfully updated', })
})
// Create a plan for an event
export const createANewPlan = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = newPlanDataValidator.validate(req.body)
  const { eventId } = req.params

  if (error) {
    res.status(400);
    throw new Error(error?.details[0]?.message || 'An error occurred during operation')
  }

  // Check event ID
  const event = await Events.findOne({ _id: eventId })
  if (!event) {
    res.status(404)
    throw new Error("The provided event doesn't exist")
  }

  // Create plan
  const plan = await Plans.create({ ...value, eventId })

  res.status(200).json({ success: true, message: 'Plan was created successfully', planId: plan._id })
})

// Get event plans
export const getPlans = customErrorHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params

  // Get Plans 
  const plans = await Plans.find({ eventId }).populate('benefits', "_id title description")
  res.status(200).json({ success: true, count: plans?.length, result: plans })
})

// Mark an event as completed
export const markEventCompleted = customErrorHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params

  // Check event ID
  const event = await Events.findOne({ _id: eventId })
  if (!event) {
    res.status(404)
    throw new Error("The provided event doesn't exist")
  }
  // Update event
  await Events.updateOne({ _id: eventId }, { $set: { status: 'completed' } })
  res.status(200).json({ success: true, message: 'Event was succesfully marked as completed' })
})

// Get most current event
export const getCurrentEvent = customErrorHandler(async (req: Request, res: Response) => {
  const current = await Events.findOne({ status: 'pending' })
  if (!current) {
    throw new Error('There is no current event. All events have been completed...')
  }

  // Get plans
  const plans = await Plans.find({ eventId: current?._id }).populate('benefits', "_id title description")

  // Get sponsors

  // Get approved speakers
  const { _id, name, edition, location, slugname, startDate, endDate } = current
  res.status(200).json({ result: { _id, name, edition, location, slugname, startDate, endDate, plans } })
})

// Register as a speaker for an event
export const registerAsASpeakerForEvent = customErrorHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params
  const { error, value } = registerAsASpeakerForAnEventDataValidator.validate(req.body)
  if (error) {
    res.status(400)
    throw new Error(error?.details[0]?.message)
  }

  // Get the event by eventId
  const event = await Events.findOne({ _id: eventId })
  if (!event) {
    res.status(404)
    throw new Error("The provided event does not exist")
  }

  // Get speaker and check status
  const speaker = await Speakers.findOne({ _id: value?.speakerId })
  if (speaker?.status !== 'approved') {
    res.status(401)
    throw new Error("The provided speaker isn't authorized to perfrom this action...")
  }

  // Check if a request exists with the same userId
  let exists = event?.speakers?.find(speaker => speaker.speakerId.equals(value.speakerId))
  if (exists) {
    // The user already has a request
    res.status(401)
    throw new Error('The speaker has already sent a request to be a speaker at the said event!')
  }
  // Send an email to admin to tell them of the new request

  // Send an email to speaker to notify them that the request has been received 

  // Create a speaker request
  await Events.updateOne({ _id: eventId }, { $push: { speakers: { ...value, status: 'pending' } } })
  res.status(200).json({ success: true, message: 'The request to become a speaker has been sent successfully...' })
})

// Register for an event

// Approve applicant as a speaker in event

// Verify user's ticket