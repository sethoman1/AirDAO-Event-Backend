import { Request, Response, NextFunction, RequestHandler } from 'express';

const customErrorHandler = (handler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      res.status(res?.statusCode === 200 ? 500 : res.statusCode).json({ error: error?.message as string })
    }
  };
};

export default customErrorHandler