import { Request, Response } from "express";
import customErrorHandler from "../../utils/customErrorHandler";
import { newEventDataValidator } from "../../libs/joi";
import Events from "../../schemas/Events.schema";
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
  let event = await Events.create({ ...value, plans: [], status: 'pending', speakers: [], sponsors: [], slugname })

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

// Mark an event as completed

// Get most current event

// Register as a speaker for an event

// Register for an event

// Approve applicant as a speaker in event

// Verify user's ticket