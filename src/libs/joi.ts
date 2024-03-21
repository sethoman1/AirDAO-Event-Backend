import Joi from 'joi'

export const newBenefitDataValidator = Joi.object({
  benefit: Joi.string().required().min(4)
})

export const newEventDataValidator = Joi.object({
  name: Joi.string().required().min(4),
  desc: Joi.string().required().min(4),
  edition: Joi.string().optional(),
  location: Joi.string().required().min(4),
  startDate: Joi.date(),
  endDate: Joi.date(),
})

export const newPlanDataValidator = Joi.object({
  price: Joi.number().required(),
  packageName: Joi.string().required().min(4),
  benefits: Joi.array().items(Joi.string()).min(1).required()
})