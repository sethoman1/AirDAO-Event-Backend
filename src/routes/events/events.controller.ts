import { Request, Response } from "express";
import Plans from '../../schemas/SponsorshipPlans'
import Events from "../../schemas/Events.schema";

import { newPlanDataValidator, newEventDataValidator } from "../../libs/joi";
import customErrorHandler from "../../utils/customErrorHandler";
import createSlugname from "../../utils/createSlugname";

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
  let event = await Events.create({ ...value, status: 'pending', sponsors: [], slugname })

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
  const plan = await Plans.create(value)

  res.status(200).json({ success: true, message: 'Plan was created successfully', planId: plan._id })
})

// Get event plans
export const getPlans = customErrorHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params

  // Get Plans 
  const plans = await Plans.find({ eventId }).populate('benefits', "_id benefit")
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

// Register as a speaker for an event

// Register for an event

// Approve applicant as a speaker in event

// Verify user's ticket