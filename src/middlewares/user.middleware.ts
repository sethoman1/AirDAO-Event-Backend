import { Request, Response, NextFunction } from "express"
const user = (req: Request, res: Response, next: NextFunction) => {
  // Check user header 


  // Populate user details
  next()
}

export default user