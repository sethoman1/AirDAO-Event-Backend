import Joi from 'joi'

export const newBenefitDataValidator = Joi.object({
  title: Joi.string().required().min(4),
  description: Joi.string().required().min(4)
})

export const newEventDataValidator = Joi.object({
  name: Joi.string().required().min(4),
  desc: Joi.string().required().min(4),
  edition: Joi.string().optional(),
  location: Joi.string().required().min(4),
  startDate: Joi.date(),
  endDate: Joi.date(),
})

export const newSpeakerDataValidator = Joi.object({
  fullname: Joi.string().required().min(4),
  email: Joi.string().required().min(4),
  address: Joi.string().required().min(4),
  phone: Joi.string().required().min(10),
  bio: Joi.string().required().min(4),
  orgName: Joi.string().required().min(4),
  jobTitle: Joi.string().required().min(4),
  handles: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    link: Joi.string().required()
  })).min(1).required(),
})

export const editSpeakerDataValidator = newSpeakerDataValidator.keys({
  token: Joi.string().required()
})

export const moderateSpeakerDataValidator = Joi.object({
  moderation: Joi.string().required().min(4),
  rejectReason: Joi.string().optional()
})

export const registerAsASpeakerForAnEventDataValidator = Joi.object({
  speakerId: Joi.string().required().min(1),
  presentationTopic: Joi.string().required().min(5),
  presentationAbstract: Joi.string().required().min(5),
  additionalComments: Joi.string().optional()
})

export const newPlanDataValidator = Joi.object({
  price: Joi.number().required(),
  packageName: Joi.string().required().min(4),
  benefits: Joi.array().items(Joi.string()).min(1).required(),
  slots: Joi.number().required()
})