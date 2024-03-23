import { Response, Request } from "express";
import Events from "../../schemas/Events.schema";
import Plans from '../../schemas/Plans.schema'
import Speakers from "../../schemas/Speakers.schema";
import Sponsors from "../../schemas/Sponsors.schema";


import customErrorHandler from "../../utils/customErrorHandler";
import { newSponsorDataValidator } from "../../libs/joi";

// Register As a Sponsor
export const registerAsASponsor = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = newSponsorDataValidator.validate(req.body)
  const { eventId } = req.params

  if (error) {
    res.status(400)
    throw new Error(error?.details[0]?.message as string)
  }
  // Check for event's status
  const event = await Events.findOne({ _id: eventId })
  if (!event) {
    res.status(404)
    throw new Error('The provided event does not exist')
  }

  if (event.status !== 'pending') {
    res.status(403)
    throw new Error('The provided event is not available for this action')
  }


  // Check plan
  const plan = await Plans.findOne({ _id: value?.planId })
  if (!plan) {
    res.status(404)
    throw new Error('The provided plan was not found')
  }

  if (plan.availableSlots === 0) {
    res.status(403)
    throw new Error('There are no slots available for this plan')
  }

  // Register speaker
  await Speakers.create({ ...value, eventId: '', proofUrl: '', paymentVerified: false })

  // Reduce Slots in plan
  await Plans.updateOne({ _id: value?.planId }, { $inc: { availableSlots: -1 } })

  res.status(200).json({ success: true, message: 'Sponsorship proof has been successfully uploaded...' })
})

// Add sponsorship proof
export const addSponsorshipProof = customErrorHandler(async (req: Request, res: Response) => {
  const { sponsorId } = req.params

  let url = ''
  // Check sponsorship
  const sponsor = await Sponsors.findOne({ _id: sponsorId })
  if (!sponsor) {
    throw new Error('The sponsor was not found')
  }

  // Notify admin of new sponsorship

  // Add proof
  await Sponsors.updateOne({ _id: sponsorId }, { $set: { proofUrl: url } })
  res.status(200).json({ success: true, message: 'Sponsorship proof has been successfully added...' })
})

//Moderate Sponsor
