import ExtendedRequest from "../../types/request";
import customErrorHandler from "../../utils/customErrorHandler";
import { Response } from 'express'

export const getLoggedInUser = customErrorHandler(async (req: ExtendedRequest, res: Response) => {
  res.status(200).json(req.user)
})
