import { newBenefitDataValidator } from '../../libs/joi';
import Benefits from '../../schemas/Benefits.schema';

import { Response, Request } from 'express'
import customErrorHandler from '../../utils/customErrorHandler';

// Create a new benefit
export const createNewBenefit = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = newBenefitDataValidator.validate(req.body);


  if (error) {
    res.status(400);
    throw new Error("Please provide all required information")
  }

  // Check if benefit exists 
  const exists = await Benefits.findOne({ title: value?.title, description: value?.description })
  if (exists) {
    res.status(400)
    throw new Error("This benefit already exists")
  }

  // Store value
  await Benefits.create({ title: value?.title, description: value?.description })

  res.status(200).json({ success: true, message: 'Benefit created successfully' })

})

// Get All Benefits
export const getAllBenefits = customErrorHandler(async (req: Request, res: Response) => {
  const benefits = await Benefits.find()
  res.status(200).json({ result: benefits, count: benefits.length })
})