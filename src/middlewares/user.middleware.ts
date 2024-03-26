import { Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import Users from "../schemas/Users.schema";

import customErrorHandler from "../utils/customErrorHandler";
import ExtendedRequest from "../types/request";

interface IValidDataResponse {
  _id: string;
  exp: number;
  iat: number;
}

const user = customErrorHandler(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  // Check user header 

  if (!req?.headers?.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    res.status(403);
    throw new Error("User not authenticated");
  }
  let token = req?.headers.authorization.split(" ")[1];

  // Compare auth
  let valid: any = await jwt.verify(token, process.env.JWT_KEY as string);
  if (!valid || !valid?._id) {
    res.status(403);
    throw new Error("User not authenticated");
  }

  // Fetch user
  const user: any = await Users.findOne({ _id: valid._id })
  if (!user) {
    res.status(403);
    throw new Error("User not authenticated");
  }


  // Populate user details
  const { _id, email, username } = user
  req.user = { _id, email, username }
  next()
})

export default user