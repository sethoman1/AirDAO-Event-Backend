import { Request, Response, NextFunction } from "express"
const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // res.status = res.statusCode == 200 ? 500 : res.statusCode
  res.status(200).json({ error: err })
}

export default error