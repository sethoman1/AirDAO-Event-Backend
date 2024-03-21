import Joi from 'joi'

export const newBenefitDataValidator = Joi.object({
  benefit: Joi.string().required().min(4)
}) 