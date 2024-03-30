import { Request, Response } from "express";
import Users from "../../schemas/Users.schema";

import customErrorHandler from "../../utils/customErrorHandler";
import { loginUserDataValidator, resetPasswordDataValidator, setPasswordDataValidator } from "../../libs/joi";
import jwt from "jsonwebtoken";
import generateKey from "../../utils/generateKey";

// Login as admin
export const loginAdmin = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = loginUserDataValidator.validate(req.body)

  if (error) {
    res.status(400)
    throw new Error(error?.details[0]?.message)
  }

  // Fetch user
  const user: any = await Users.findOne({ username: value?.username }, { __v: 0 })
  if (!user) {
    res.status(401)
    throw new Error('The provided credentials are invalid...')
  }

  // Check password
  const valid = await user.comparePassword(value?.password as string)
  if (!valid) {
    res.status(401)
    throw new Error('The provided credentials are invalid')
  }

  // Return credentials
  const { _id, username, email } = user

  // Create token
  const token = await jwt.sign({ _id, username }, process.env.JWT_KEY as string, { expiresIn: '1d' })
  res.status(200).json({ success: true, token, data: { _id, email, username } })
})

// Reset account password
export const resetPassword = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = resetPasswordDataValidator.validate(req.body)

  if (error) {
    res.status(400)
    throw new Error(error?.details[0]?.message)
  }

  // Fetch user
  const user: any = await Users.findOne({ email: value?.email }, { password: 0, __v: 0 })
  if (!user) {
    res.status(401)
    throw new Error('Please enter the valid email address for admin')
  }

  // Generate token
  const code = generateKey(6)
  const token = await jwt.sign({ _id: user?._id, code, type: 'resetp' }, process.env.JWT_KEY as string, { expiresIn: '1h' })
  console.log(token)
  // Send an email

  // Store code
  await Users.updateOne({ email: value?.email }, { $set: { code } })

  res.status(200).json({ success: true, message: 'An email has been sent to validate to reset your password' })
})

// Set new password
export const setPassword = customErrorHandler(async (req: Request, res: Response) => {
  const { error, value } = setPasswordDataValidator.validate(req.body)

  if (error) {
    res.status(400)
    throw new Error(error?.details[0]?.message)
  }

  // Check jwt
  const valid: any = await jwt.verify(value?.token, process.env.JWT_KEY as string)

  if (!valid || valid.type !== 'resetp' || !valid.code || !valid._id) {
    res.status(401)
    throw new Error('The reset token is invalid')
  }

  // Fetch user and compare code
  console.log(valid)
  const user: any = await Users.findOne({ _id: valid._id })
  if (!user) {
    throw new Error('The provided token is invalid')
  }

  //Store code
  await user.updatePassword(value?.password as string)
  await user.save()

  res.status(200).json({ success: true, message: 'Your password was reset succesfully' })
})

// Create test admin
export const createAdmin = customErrorHandler(async (req: Request, res: Response) => {
  const users = await Users.find()
  if (users?.length > 0) {
    res.status(401)
    throw new Error('A dummy admin account already exists')
  }
  await Users.create({ email: 'admin@airdao.com', password: 'TestPassword123', username: 'manairdao' })

  res.status(200).json({ success: true, message: 'Admin successfully created...' })

})


// Change password