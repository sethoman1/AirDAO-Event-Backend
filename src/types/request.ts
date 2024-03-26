import { Request } from "express"

// This is an interface for all requests in the app, this contains the req.user
interface ExtendedRequest extends Request {
  user?: any
}

export default ExtendedRequest